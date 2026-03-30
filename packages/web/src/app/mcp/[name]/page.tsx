import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageHeader } from "@/components/PageHeader";
import { loadMcp, loadAllMcp } from "@/lib/data";



export const dynamicParams = false;


export function generateStaticParams() {
  const mcps = loadAllMcp();

  if (mcps.length === 0) {
    return [{ name: "_empty" }];
  }

  return mcps.map((mcp) => ({
    name: mcp.name,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const mcp = loadMcp(name);

  if (!mcp) {
    return { title: "MCP Config Not Found" };
  }

  return {
    title: `${mcp.name} MCP Server | Aleksandr Ivannikov`,
    description: `${mcp.description.split(".").slice(0, 2).join(".")} Enterprise-grade AI integrations.`,
    openGraph: {
      title: `${mcp.name} MCP Server | Aleksandr Ivannikov`,
      description: `${mcp.description.split(".")[0]}.`,
    },
  };
}


export default async function McpPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const mcp = loadMcp(name);

  if (!mcp) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <PageHeader
        name={mcp.name}
        type="mcp server"
        description={mcp.description}
        command={`npm i ${mcp.package}`}
      />

      {/* Content */}
      <article className="prose prose-slate prose-indigo max-w-none animate-fade-in-up-delay-2">
        <Markdown remarkPlugins={[remarkGfm]}>{mcp.content}</Markdown>
      </article>
    </div>
  );
}
