import { spawn } from "node:child_process";

const command = process.argv[2];
const args = process.argv.slice(3);

if (!command) {
  console.error("Usage: node scripts/run-vinext.mjs <dev|build|start> [...args]");
  process.exit(1);
}

const executable = process.platform === "win32" ? "vinext.cmd" : "vinext";
const env = { ...process.env };

if (process.platform === "win32") {
  const pathValue = env.Path ?? env.PATH ?? "";
  delete env.Path;
  delete env.PATH;
  env.Path = pathValue;
}

const child = spawn(executable, [command, ...args], {
  env: {
    ...env,
    WRANGLER_LOG_PATH: env.WRANGLER_LOG_PATH ?? ".wrangler/wrangler.log",
  },
  shell: process.platform === "win32",
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`vinext exited with signal ${signal}`);
    process.exit(1);
  }
  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
