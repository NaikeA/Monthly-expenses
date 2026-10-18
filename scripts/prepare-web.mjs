import { mkdir, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
const root=resolve(dirname(fileURLToPath(import.meta.url)),"..");
await mkdir(resolve(root,"dist"),{recursive:true});
await copyFile(resolve(root,"index.html"),resolve(root,"dist/index.html"));
console.log("Prepared local offline copy of Monthly Expenses in dist/");
