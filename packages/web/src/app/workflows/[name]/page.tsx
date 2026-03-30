import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageHeader } from "@/components/PageHeader";
import { loadWorkflow, loadAllWorkflows } from "@/lib/data";



export const dynamicParams = false;


export function generateStaticParams() {
  const workflows = loadAllWorkflows();

  if (workflows.length === 0) {
    return [{ name: "_empty" }];
  }

  return workflows.map((workflow) => ({
    name: workflow.name,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const workflow = loadWorkflow(name);

  if (!workflow) {
    return { title: "Workflow Not Found" };
  }

  return {
    title: `${workflow.name} AI Agent Workflow | Aleksandr Ivannikov`,
    description: `${workflow.description.split(".").slice(0, 2).join(".")} Accelerate your development.`,
    openGraph: {
      title: `${workflow.name} AI Agent Workflow | Aleksandr Ivannikov`,
      description: `${workflow.description.split(".")[0]}.`,
    },
  };
}


export default async function WorkflowPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const workflow = loadWorkflow(name);

  if (!workflow) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <PageHeader
        name={workflow.name}
        type="workflow"
        description={workflow.description}
        command={`npx @ivannikov-pro/ai-agent-kit@latest add ${workflow.name}`}
      />

      {/* Content */}
      <article className="prose prose-slate prose-indigo max-w-none animate-fade-in-up-delay-2">
        <Markdown remarkPlugins={[remarkGfm]}>{workflow.content}</Markdown>
      </article>
    </div>
  );
}
