"use client";

import { useState } from "react";

import type { SkillData } from "@/lib/data";

import { CopyableCommand } from "./CopyableCommand";
import { ItemCard } from "./ItemCard";
import { StatCard } from "./StatCard";
import { CategorySection } from "./CategorySection";
import { IconSearch } from "./icons/IconSearch";
import { ConsultationButton } from "./ConsultationButton";


export type MCPEntry = {
  name: string;
  type: "mcp server";
  description: string;
  package: string;
};


export type WorkflowEntry = {
  name: string;
  type: "workflow";
  description: string;
  source: string;
};


export function HomeClient({
  skills,
  mcpEntries,
  workflowsEntries,
}: {
  skills: SkillData[];
  mcpEntries: MCPEntry[];
  workflowsEntries: WorkflowEntry[];
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const q = searchQuery.toLowerCase();

  const filteredSkills = skills.filter((s) => s.name.toLowerCase().includes(q)
    || s.description.toLowerCase().includes(q)
    || (s.tags && s.tags.some((tag) => tag.toLowerCase().includes(q))));

  const filteredMcp = mcpEntries.filter((m) => m.name.toLowerCase().includes(q)
    || m.description.toLowerCase().includes(q)
    || m.package.toLowerCase().includes(q));

  const filteredWorkflows = workflowsEntries.filter((w) => w.name.toLowerCase().includes(q)
    || w.description.toLowerCase().includes(q));

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* ─── Hero ─── */}
      <section className="text-center pt-20 pb-16 animate-fade-in-up">

        <div className="mb-4">
          <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600">
            Aleksandr Ivannikov | Open Source
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight max-w-4xl mx-auto text-slate-900">
          Build Custom AI Agents Faster with{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Production-Ready Workflows
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          A curated collection of skills, workflows, and MCP configs.
          Skip the boilerplate and install enterprise-grade capabilities with a single command.
        </p>

        {/* ─── Get Started CTA ─── */}
        <div className="text-center py-8 px-6 mb-12 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 border border-slate-200 max-w-3xl mx-auto shadow-sm">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Get Started</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <CopyableCommand
              className="text-sm bg-white border border-slate-200 hover:border-slate-300 px-6 py-3 rounded-xl text-indigo-500 transition-colors w-full md:w-auto"
              command="npx @ivannikov-pro/ai-agent-kit@latest init"
            />
            <ConsultationButton className="text-sm px-6 py-3 w-full md:w-auto">
              Book a Consultation
            </ConsultationButton>
          </div>
          <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
             Run this command in any repository to create an <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-900">.agents/</code> directory and prepare your project for AI agent skills.
          </p>
        </div>

        {/* ─── Search Bar ─── */}
        <div className="max-w-2xl mx-auto relative group text-left">
          <IconSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
          />
          <input
            type="text"
            placeholder="Search skills, workflows, and MCP configs..."
            className="w-full bg-slate-50 border border-slate-200 group-hover:border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none rounded-xl pl-12 pr-4 py-4 text-slate-900 transition-all placeholder:text-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="grid grid-cols-3 gap-4 mb-20 max-w-md mx-auto animate-fade-in-up-delay-1">
        <StatCard value={skills.length} label="Skills" color="text-cyan-500" />
        <StatCard value={workflowsEntries.length} label="Workflows" color="text-purple-500" />
        <StatCard value={mcpEntries.length} label="MCP Servers" color="text-emerald-500" />
      </section>

      {/* ─── Nothing Found State ─── */}
      {filteredSkills.length === 0 && filteredWorkflows.length === 0 && filteredMcp.length === 0 && (
        <section className="text-center py-20 animate-fade-in">
          <div className="text-slate-500">
            No results found for &quot;{searchQuery}&quot;
          </div>
        </section>
      )}

      {/* ─── Skills ─── */}
      <CategorySection
        id="skills"
        title="Skills"
        color="bg-cyan-500"
        count={filteredSkills.length}
        show={filteredSkills.length > 0}
      >
        {filteredSkills.map((skill) => (
          <ItemCard
            key={skill.name}
            href={`/skills/${skill.name}`}
            name={skill.name}
            type="skill"
            description={skill.description}
            tags={skill.tags}
            tools={skill.tools}
            command={`npx @ivannikov-pro/ai-agent-kit@latest add ${skill.name}`}
          />
        ))}
      </CategorySection>

      {/* ─── Workflows ─── */}
      <CategorySection
        id="workflows"
        title="Workflows"
        color="bg-purple-500"
        count={filteredWorkflows.length}
        show={filteredWorkflows.length > 0 || (workflowsEntries.length === 0 && searchQuery === "")}
        delayClass="animate-fade-in-up-delay-3"
        emptyState={
          <div className="p-10 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p className="text-slate-500">Workflows coming soon...</p>
          </div>
        }
      >
        {filteredWorkflows.map((entry) => (
          <ItemCard
            key={entry.name}
            href={`/workflows/${entry.name}`}
            name={entry.name}
            type="workflow"
            description={entry.description}
            tags={["workflow", "agent"]}
            tools={[entry.source ? "local" : "remote"]}
            command={`npx @ivannikov-pro/ai-agent-kit@latest add ${entry.name}`}
          />
        ))}
      </CategorySection>

      {/* ─── MCP Configs ─── */}
      <CategorySection
        id="mcp_servers"
        title="MCP Configs"
        color="bg-emerald-500"
        count={filteredMcp.length}
        show={filteredMcp.length > 0}
        delayClass="animate-fade-in-up-delay-3"
      >
        {filteredMcp.map((entry) => (
          <ItemCard
            key={entry.name}
            href={`/mcp/${entry.name}`}
            name={entry.name}
            type="mcp server"
            description={entry.description}
            tags={["mcp server"]}
            tools={[entry.package.split("/").pop()!]}
            command={`npm i ${entry.package}`}
          />
        ))}
      </CategorySection>
    </div>
  );
}
