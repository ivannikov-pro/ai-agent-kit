import fs from "fs/promises";
import path from "path";



async function parseYamlFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split("\n");
  const result = {};

  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;

    // Check if it's a property under an object, like version under metadata
    if (line.startsWith("  ")) {
      if (currentKey && currentKey === "metadata") {
        const m = line.match(/^\s*(.+?):\s*(.+)$/);
        if (m) {
          result.metadata = result.metadata || {};
          let val = m[2].trim();
          if (val.startsWith("\"") && val.endsWith("\"")) val = val.slice(1, -1);
          result.metadata[m[1].trim()] = val;
        }
      }
      continue;
    }

    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let valueStr = line.slice(colonIdx + 1).trim();

      // parse arrays
      if (valueStr.startsWith("[") && valueStr.endsWith("]")) {
        const arrStr = valueStr.slice(1, -1);
        const arr = arrStr.split(",").map((s) => {
          let v = s.trim();
          if (v.startsWith("\"") && v.endsWith("\"")) return v.slice(1, -1);
          if (v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1);
          return v;
        }).filter(Boolean);
        result[key] = arr;
      } else {
        if (valueStr.startsWith("\"") && valueStr.endsWith("\"")) valueStr = valueStr.slice(1, -1);
        if (valueStr.startsWith("'") && valueStr.endsWith("'")) valueStr = valueStr.slice(1, -1);
        result[key] = valueStr;
      }
      currentKey = key;
    }
  }
  return result;
}



async function main() {
  const registryPath = path.join(process.cwd(), "registry.json");
  const registryObj = JSON.parse(await fs.readFile(registryPath, "utf8"));

  // Ensure skills/ and workflows/ are set in registry
  registryObj.skills = registryObj.skills || {};
  registryObj.workflows = registryObj.workflows || {};

  // Parse skills
  const skillsDir = path.join(process.cwd(), "skills");
  const skillDirs = await fs.readdir(skillsDir);
  for (const dirName of skillDirs) {
    const stat = await fs.stat(path.join(skillsDir, dirName));
    if (!stat.isDirectory()) continue;

    const skillPath = path.join(skillsDir, dirName, "SKILL.md");
    try {
      const content = await fs.readFile(skillPath, "utf8");
      const frontmatter = await parseYamlFrontmatter(content);

      registryObj.skills[dirName] = {
        source: `local:skills/${dirName}`,
        description: frontmatter.description || "",
        tags: frontmatter.tags || [],
        version: (frontmatter.metadata && frontmatter.metadata.version) ? frontmatter.metadata.version : "1.0.0"
      };
    } catch(e) {
      console.error(`Error reading skill ${dirName}: ${e.message}`);
    }
  }

  // Parse workflows
  const workflowsDir = path.join(process.cwd(), "workflows");
  const workflowFiles = await fs.readdir(workflowsDir);
  for (const fileName of workflowFiles) {
    if (!fileName.endsWith(".md")) continue;
    const wfName = fileName.replace(".md", "");

    const wfPath = path.join(workflowsDir, fileName);
    try {
      const content = await fs.readFile(wfPath, "utf8");
      const frontmatter = await parseYamlFrontmatter(content);

      registryObj.workflows[wfName] = {
        source: `local:workflows/${wfName}`,
        description: frontmatter.description || ""
      };
      if (frontmatter.tags) {
        registryObj.workflows[wfName].tags = frontmatter.tags;
      }
    } catch(e) {
      console.error(`Error reading workflow ${wfName}: ${e.message}`);
    }
  }

  await fs.writeFile(registryPath, JSON.stringify(registryObj, null, 2) + "\n", "utf8");
  console.log("Registry updated successfully!");
}



main().catch(console.error);
