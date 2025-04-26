import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
    const readable = createReadStream(filePath, { encoding: "utf8" });
    readable.pipe(process.stdout);

    readable.on("end", () => {
        console.log("\n manual flushing");
    });
};

await read();