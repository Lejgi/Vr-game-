import { createApp } from "./app.js";
import { seedStore } from "./store.js";

const port = Number(process.env.PORT ?? 8787);

async function main() {
  await seedStore({ forceBuiltin: false });
  const app = createApp();
  app.listen(port, () => {
    console.log(`Kuchařka API běží na http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
