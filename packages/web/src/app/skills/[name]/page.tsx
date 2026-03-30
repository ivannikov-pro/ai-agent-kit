import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageHeader } from "@/components/PageHeader";
import { loadSkill, loadAllSkills } from "@/lib/data";



export const dynamicParams = false;


export function generateStaticParams() {
  const skills = loadAllSkills();

  if (skills.length === 0) {
    return [{ name: "_empty" }];
  }

  return skills.map((skill) => ({
    name: skill.name,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const skill = loadSkill(name);

  if (!skill) {
    return { title: "Skill Not Found" };
  }

  return {
    title: `${skill.name} AI Agent Skill | Aleksandr Ivannikov`,
    description: `${skill.description.split(".").slice(0, 2).join(".")} Get production-ready AI workflows.`,
    openGraph: {
      title: `${skill.name} AI Agent Skill | Aleksandr Ivannikov`,
      description: `${skill.description.split(".")[0]}.`,
    },
  };
}


export default async function SkillPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const skill = loadSkill(name);

  if (!skill) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <PageHeader
        name={skill.name}
        type="skill"
        description={skill.description}
        version={skill.version}
        author={skill.author}
        license={skill.license}
        category={skill.category}
        tags={skill.tags}
        command={`npx @ivannikov-pro/ai-agent-kit@latest add ${skill.name}`}
      />

      {/* SKILL.md Content */}
      <article className="prose prose-slate prose-indigo max-w-none animate-fade-in-up-delay-2">
        <Markdown remarkPlugins={[remarkGfm]}>{skill.content}</Markdown>
      </article>
    </div>
  );
}
