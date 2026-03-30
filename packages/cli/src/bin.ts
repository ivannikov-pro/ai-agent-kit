import { Command } from "commander";
import { listCommand } from "./commands/list.js";
import { addCommand } from "./commands/add.js";
import { removeCommand } from "./commands/remove.js";
import { initCommand } from "./commands/init.js";
import { startMcpServer } from "./mcp/server.js";



const program = new Command();


program
  .name("ai-agent-kit")
  .description(
    "Build Custom AI Agents Faster. By Aleksandr Ivannikov | Open Source (ivannikov.pro)",
  )
  .version("0.1.0");


program
  .command("list")
  .description("List available expert skills, workflows, and MCP servers")
  .option("-s, --skills", "Show only skills")
  .option("-w, --workflows", "Show only workflows")
  .option("-m, --mcp", "Show only MCP servers")
  .action(listCommand);


program
  .command("add")
  .description("Install production-ready skills or workflows into your project")
  .argument("<name>", "Name of the resource to install")
  .option("-w, --workflow", "Install as workflow")
  .option("-g, --global", "Install globally (~/.agents/)")
  .option("-t, --target <path>", "Custom target directory")
  .action(addCommand);


program
  .command("remove")
  .description("Remove an installed skill or workflow")
  .argument("<name>", "Name of the resource to remove")
  .action(removeCommand);


program
  .command("init")
  .description("Initialize advanced AI agent capabilities for your project")
  .action(initCommand);


program
  .command("mcp")
  .description("Start the MCP server to integrate with AI tools")
  .action(startMcpServer);


program.parse();
