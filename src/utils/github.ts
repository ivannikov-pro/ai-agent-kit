import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";


const GITHUB_API = "https://api.github.com";


type GitHubTreeItem = {
  path: string;
  mode: string;
  type: "blob" | "tree";
  sha: string;
  url: string;
};


type GitHubBlobResponse = {
  content: string;
  encoding: string;
};


/**
 * Parse a source string like "github:owner/repo" or "github:owner/repo/path/to/dir"
 */
export function parseGitHubSource(source: string): {
  owner: string;
  repo: string;
  path: string;
} {
  const cleaned = source.replace("github:", "");
  const parts = cleaned.split("/");

  if (parts.length < 2) {
    throw new Error(`Invalid GitHub source: ${source}`);
  }

  const owner = parts[0];
  const repo = parts[1];
  const path = parts.slice(2).join("/") || "";

  return { owner, repo, path };
}


/**
 * Fetch the file tree of a GitHub repository (or subdirectory)
 */
async function fetchTree(
  owner: string,
  repo: string,
  path: string,
): Promise<GitHubTreeItem[]> {
  const ref = "HEAD";

  if (path) {
    // Fetch specific directory contents
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${path}?ref=${ref}`;
    const res = await fetch(url, {
      headers: getHeaders(),
    });

    if (!res.ok) {
      throw new Error(
        `GitHub API error: ${res.status} ${res.statusText} for ${url}`,
      );
    }

    const items = (await res.json()) as Array<{
      name: string;
      path: string;
      type: string;
      sha: string;
      download_url: string | null;
    }>;

    return items.map((item) => ({
      path: item.path,
      mode: "100644",
      type: item.type === "dir" ? "tree" as const : "blob" as const,
      sha: item.sha,
      url: item.download_url || "",
    }));
  }

  // Fetch entire repo tree
  const url = `${GITHUB_API}/repos/${owner}/${repo}/git/trees/${ref}?recursive=1`;
  const res = await fetch(url, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub API error: ${res.status} ${res.statusText} for ${url}`,
    );
  }

  const data = (await res.json()) as { tree: GitHubTreeItem[] };

  return data.tree;
}


/**
 * Download a single file from GitHub
 */
async function downloadFile(
  owner: string,
  repo: string,
  filePath: string,
): Promise<string> {
  const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${filePath}`;
  const res = await fetch(url, {
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error(
      `GitHub API error: ${res.status} ${res.statusText} for ${url}`,
    );
  }

  const data = (await res.json()) as GitHubBlobResponse;

  if (data.encoding === "base64") {
    return Buffer.from(data.content, "base64").toString("utf-8");
  }

  return data.content;
}


/**
 * Download an entire directory from GitHub into a local path
 */
export async function downloadGitHubDir(
  owner: string,
  repo: string,
  remotePath: string,
  localPath: string,
): Promise<string[]> {
  const files: string[] = [];

  if (remotePath) {
    // Download specific directory
    const items = await fetchTree(owner, repo, remotePath);

    for (const item of items) {
      if (item.type === "blob") {
        const content = await downloadFile(owner, repo, item.path);
        const relativePath = item.path.replace(`${remotePath}/`, "").replace(remotePath, "");
        const localFilePath = relativePath
          ? join(localPath, relativePath)
          : join(localPath, item.path.split("/").pop()!);

        await mkdir(dirname(localFilePath), { recursive: true });
        await writeFile(localFilePath, content, "utf-8");

        files.push(localFilePath);
      } else if (item.type === "tree") {
        // Recursively download subdirectory
        const subFiles = await downloadGitHubDir(
          owner,
          repo,
          item.path,
          join(localPath, item.path.split("/").pop()!),
        );

        files.push(...subFiles);
      }
    }
  } else {
    // Download entire repo (excluding usual meta files)
    const tree = await fetchTree(owner, repo, "");
    const skipPrefixes = [".git", ".github", "node_modules"];
    const skipFiles = [".gitignore", "LICENSE", "README.md", "package.json", "package-lock.json"];

    const blobs = tree.filter(
      (item) =>
        item.type === "blob" &&
        !skipPrefixes.some((p) => item.path.startsWith(p)) &&
        !skipFiles.includes(item.path),
    );

    for (const blob of blobs) {
      const content = await downloadFile(owner, repo, blob.path);
      const localFilePath = join(localPath, blob.path);

      await mkdir(dirname(localFilePath), { recursive: true });
      await writeFile(localFilePath, content, "utf-8");

      files.push(localFilePath);
    }
  }

  return files;
}


function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "agent-kit-cli",
  };

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}
