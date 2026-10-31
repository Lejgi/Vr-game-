import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";
import { promises as fs } from "node:fs";
import type { AddressInfo } from "node:net";
import { createApp } from "./app.js";
import { seedStore } from "./store.js";
import { storePath } from "./paths.js";

describe("HTTP API", () => {
  let baseUrl = "";
  let server: ReturnType<ReturnType<typeof createApp>["listen"]>;
  const backupPath = `${storePath}.http-backup`;

  before(async () => {
    try {
      await fs.copyFile(storePath, backupPath);
    } catch {
      // ignore
    }
    await fs.rm(storePath, { force: true });
    await seedStore({ forceBuiltin: true });

    const app = createApp();
    server = app.listen(0);
    const addr = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${addr.port}`;
  });

  after(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((err) => (err ? reject(err) : resolve()));
    });
    await fs.rm(storePath, { force: true });
    try {
      await fs.rename(backupPath, storePath);
    } catch {
      // ignore
    }
  });

  it("GET /health", async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { ok: boolean };
    assert.equal(body.ok, true);
  });

  it("GET /api/recipes", async () => {
    const res = await fetch(`${baseUrl}/api/recipes`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { count: number; recipes: unknown[] };
    assert.equal(body.count, 10);
    assert.equal(body.recipes.length, 10);
  });

  it("GET /api/recipes/svickova", async () => {
    const res = await fetch(`${baseUrl}/api/recipes/svickova`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { title: string; steps: unknown[] };
    assert.equal(body.title, "Svíčková na smetaně");
    assert.ok(body.steps.length > 0);
  });

  it("GET /api/recipes/sync", async () => {
    const res = await fetch(`${baseUrl}/api/recipes/sync`);
    assert.equal(res.status, 200);
    const body = (await res.json()) as { recipes: unknown[]; serverTime: string };
    assert.equal(body.recipes.length, 10);
    assert.ok(body.serverTime);
  });
});
