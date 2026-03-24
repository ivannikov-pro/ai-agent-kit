import type { SkillEntry, WorkflowEntry, AddOptions } from "./types.js";
import { parseGitHubSource, downloadGitHubDir } from "./utils/github.js";
import { ensureDir, getSkillsDir, getWorkflowsDir } from "./utils/fs.js";


/**
 * Install a skill from the registry into the project.
 */
export async function installSkill(
  name: string,
  entry: SkillEntry,
  options: AddOptions = {},
): Promise<string> {
  const { owner, repo, path } = parseGitHubSource(entry.source);

  const targetDir = options.target
    ? options.target
    : getSkillsDir(process.cwd(), options.global);

  const skillDir = `${targetDir}/${name}`;

  await ensureDir(skillDir);

  await downloadGitHubDir(owner, repo, path, skillDir);

  return skillDir;
}


/**
 * Install a workflow from the registry into the project.
 */
export async function installWorkflow(
  name: string,
  entry: WorkflowEntry,
  options: AddOptions = {},
): Promise<string> {
  const { owner, repo, path } = parseGitHubSource(entry.source);

  const targetDir = options.target
    ? options.target
    : getWorkflowsDir(process.cwd(), options.global);

  await ensureDir(targetDir);

  await downloadGitHubDir(owner, repo, path, targetDir);

  return targetDir;
}
