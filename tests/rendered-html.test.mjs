import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
const excludedLegacyTerms = [
  "We" + "b3",
  "Sol" + "idity",
  "Poly" + "Lance",
  "Poly" + "gon",
  "block" + "chain",
];

function assertNoLegacyTerms(content) {
  for (const term of excludedLegacyTerms) {
    assert.doesNotMatch(content, new RegExp(term, "i"));
  }
}

test("keeps the finished portfolio content and real links", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);
  const source = `${layout}\n${page}`;

  assert.match(source, /Dinesh Pyla \| Java Backend Developer/);
  assert.match(source, /Java Backend Developer Intern/);
  assert.match(source, /Java backend portfolio for production-style API systems/);
  assert.match(source, /WorkFlowPro/);
  assert.match(source, /ResumeFit AI/);
  assert.match(source, /Event-Driven Order Delivery/);
  assert.match(source, /ShopEase Backend API/);
  assert.match(source, /Interviewer Verdict/);
  assert.match(source, /Shortlist recommendation/);
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
  assertNoLegacyTerms(source);
});

test("builds as a Vercel-compatible Next application", async () => {
  const [css, page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  await access(new URL("../.next/BUILD_ID", import.meta.url));
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /vinext|vite|wrangler|cloudflare/i);
  assert.match(packageJson, /"build": "next build"/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/i);
  assertNoLegacyTerms(page);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview|Starter Project/);
  assert.doesNotMatch(layout, /next\/headers/);
  assert.match(page, /BackendOrbitScene/);
  assert.match(page, /Java 21/);
  assert.match(page, /Spring Boot/);
  assert.match(css, /\.backend-orbit/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assertNoLegacyTerms(css);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
  await assert.rejects(access(new URL("vite.config.ts", templateRoot)));
  await assert.rejects(access(new URL("worker/index.ts", templateRoot)));
});
