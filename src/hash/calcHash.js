import { createHash } from "node:crypto";
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToCalculateHashFor.txt");

const calculateHash = async () => {
    const readable = createReadStream(filePath, { encoding: "utf8" });

    const hash = createHash("sha256");

    readable.on('data', (chunk) => {
        hash.update(chunk);
    });

    readable.on('end', () => {
        const hexHash = hash.digest("hex");
        console.log(hexHash);
    });
};


await calculateHash();