import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const excludedLegacyTerms = [
  "We" + "b3",
  "Sol" + "idity",
  "Poly" + "Lance",
  "Poly" + "gon",
  "block" + "chain",
  "int" + "ern",
  "short" + "list",
  "inter" + "viewer " + "ver" + "dict",
  "move " + "forward",
  "candi" + "date",
  "short" + "listed",
];

function assertNoLegacyTerms(content) {
  for (const term of excludedLegacyTerms) {
    assert.doesNotMatch(content, new RegExp(term, "i"));
  }
}

async function readSourceTree(rootPath) {
  const entries = await readdir(rootPath, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith("."))
      .map(async (entry) => {
        const fullPath = path.join(rootPath, entry.name);
        if (entry.isDirectory()) {
          return readSourceTree(fullPath);
        }

        if (!/\.(ts|tsx|css)$/.test(entry.name)) {
          return "";
        }

        return readFile(fullPath, "utf8");
      }),
  );

  return files.join("\n");
}

test("keeps the finished portfolio content and real links", async () => {
  const appSource = await readSourceTree(
    fileURLToPath(new URL("../app", import.meta.url)),
  );
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const source = `${layout}\n${appSource}`;

  assert.match(source, /Dinesh Pyla \| Java Backend Developer/);
  assert.match(source, /Java Backend Developer/);
  assert.match(source, /Dinesh Pyla/);
  assert.match(source, /Java, Spring Boot, APIs, and backend systems/);
  assert.match(source, /WorkFlowPro/);
  assert.match(source, /ResumeFit AI/);
  assert.match(source, /Event-Driven Order Delivery/);
  assert.match(source, /ShopEase Backend API/);
  assert.match(source, /How I Work/);
  assert.match(source, /Practical backend habits/);
  assert.match(source, /https:\/\/github\.com\/Dinesh12328\/ResumeFit-Ai/);
  assert.match(
    source,
    /https:\/\/github\.com\/Dinesh12328\/-Event-Driven-Order-Delivery-System/,
  );
  assert.match(source, /https:\/\/workflowpro-9hi1\.onrender\.com/);
  assert.match(source, /https:\/\/resumefit-ai-7xvk\.onrender\.com/);
  assert.match(source, /https:\/\/event-driven-order-delivery\.onrender\.com/);
  assert.match(source, /https:\/\/shopease-backend-api\.onrender\.com/);
  assert.doesNotMatch(source, /Codex/);
  assert.doesNotMatch(source, /codex-preview|react-loading-skeleton/i);
  assert.doesNotMatch(
    source,
    new RegExp(
      [
        "inter" + "viewer",
        "short" + "list",
        "ver" + "dict",
        "arro" + "gant",
        "dis" + "gusting",
      ].join("|"),
      "i",
    ),
  );
  assertNoLegacyTerms(source);
});

test("builds as a Vercel-compatible Next application", async () => {
  const [appSource, layout, packageJson] = await Promise.all([
    readSourceTree(fileURLToPath(new URL("../app", import.meta.url))),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await access(new URL("../.next/BUILD_ID", import.meta.url));
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /vinext|vite|wrangler|cloudflare/i);
  assert.match(packageJson, /"build": "next build"/);
  assert.doesNotMatch(appSource, /codex-preview|SkeletonPreview/i);
  assertNoLegacyTerms(appSource);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview|Starter Project/);
  assert.doesNotMatch(layout, /next\/headers/);
  assert.match(appSource, /BackendOrbitScene/);
  assert.match(appSource, /PremiumOrbitScene/);
  assert.match(appSource, /Java 21/);
  assert.match(appSource, /Spring Boot/);
  assert.match(appSource, /\.backend-orbit/);
  assert.match(appSource, /prefers-reduced-motion:\s*reduce/);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  await assert.rejects(access(new URL("vite.config.ts", templateRoot)));
  await assert.rejects(access(new URL("worker/index.ts", templateRoot)));
});
