# @ivannikov-pro/agent-kit

🛠️ CLI + MCP server for installing AI agent skills, workflows, and MCP configs.

Your personal toolkit for AI-powered development — install curated skills and workflows from a central registry into any project.

## Quick Start

```bash
# List available resources
npx @ivannikov-pro/agent-kit list

# Install a skill into your project
npx @ivannikov-pro/agent-kit add skill-base

# Install a skill globally
npx @ivannikov-pro/agent-kit add find-docs --global

# Interactive project setup
npx @ivannikov-pro/agent-kit init
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `agent-kit list` | List all available resources |
| `agent-kit list --skills` | List only skills |
| `agent-kit add <name>` | Install a skill or workflow |
| `agent-kit add <name> --global` | Install globally (`~/.agents/`) |
| `agent-kit remove <name>` | Remove an installed resource |
| `agent-kit init` | Interactive project initialization |
| `agent-kit mcp` | Start as MCP server |

## As MCP Server

Add to your AI agent's MCP config:

```json
{
  "mcpServers": {
    "agent-kit": {
      "command": "npx",
      "args": ["-y", "@ivannikov-pro/agent-kit", "mcp"]
    }
  }
}
```

### Available MCP Tools

| Tool | Description |
|------|-------------|
| `list_resources` | List available skills, workflows, and MCP configs |
| `install_resource` | Install a skill or workflow into the project |
| `search_resources` | Search resources by keyword or tag |

## Programmatic API

```typescript
import { AgentKit } from "@ivannikov-pro/agent-kit";

const kit = new AgentKit();

// List all resources
const resources = await kit.list();

// Install a skill
await kit.install("find-docs");

// Find a specific resource
const result = await kit.find("skill-base");
```

## Available Resources

### Skills

| Name | Description |
|------|-------------|
| `skill-base` | How to create, maintain, and distribute AI agent skills |
| `find-docs` | Documentation lookup via Context7 MCP |

### MCP Configs

| Name | Package |
|------|---------|
| `ai-notify-tg` | `@ivannikov-pro/ai-notify-tg` |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` / `GH_TOKEN` | GitHub token for higher API rate limits |

## License

MIT © [ivannikov-pro](https://github.com/ivannikov-pro)
