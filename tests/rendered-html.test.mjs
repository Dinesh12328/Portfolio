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

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio content", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dinesh Pyla \| Java Backend Developer<\/title>/i);
  assert.match(html, /Java Backend Developer Intern/);
  assert.match(html, /Java backend portfolio for production-style API systems/);
  assert.match(html, /WorkFlowPro/);
  assert.match(html, /ResumeFit AI/);
  assert.match(html, /Event-Driven Order Delivery/);
  assert.match(html, /ShopEase Backend API/);
  assert.match(html, /Interviewer Verdict/);
  assert.match(html, /Shortlist recommendation/);
  assert.match(html, /https:\/\/github\.com\/Dinesh12328\/ResumeFit-Ai/);
  assert.match(
    html,
    /https:\/\/github\.com\/Dinesh12328\/-Event-Driven-Order-Delivery-System/,
  );
  assert.match(html, /https:\/\/workflowpro-9hi1\.onrender\.com/);
  assert.match(html, /https:\/\/resumefit-ai-7xvk\.onrender\.com/);
  assert.match(html, /https:\/\/event-driven-order-delivery\.onrender\.com/);
  assert.match(html, /https:\/\/shopease-backend-api\.onrender\.com/);
  assert.doesNotMatch(html, /Codex/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assertNoLegacyTerms(html);
});

test("removes starter preview files and keeps backend focus", async () => {
  const [css, page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /codex-preview|SkeletonPreview/i);
  assertNoLegacyTerms(page);
  assert.doesNotMatch(layout, /codex-preview|_sites-preview|Starter Project/);
  assert.match(page, /BackendOrbitScene/);
  assert.match(page, /Java 21/);
  assert.match(page, /Spring Boot/);
  assert.match(css, /\.backend-orbit/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assertNoLegacyTerms(css);

  await assert.rejects(access(new URL("app/_sites-preview", templateRoot)));
});
