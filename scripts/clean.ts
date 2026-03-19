import { rm } from "node:fs/promises";

const paths = ["dist", "node_modules", "package-lock.json", "bun.lock"];

for (const path of paths) {
    rm(path, { recursive: true })
        .then(() => console.log(`Successfully deleted: ${path}`))
        .catch((err) => console.log(`Error cleaning ${path}: ${err.message}`));
}
