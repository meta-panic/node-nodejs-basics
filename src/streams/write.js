import { createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
    const writable = createWriteStream(filePath, { encoding: "utf8" });

    pipeline(
        process.stdin,
        writable,
        (e) => console.error(e)
    );
};

await write();