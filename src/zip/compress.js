import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const destinationFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {
    try {
        const readable = createReadStream(sourceFilePath);
        const gzip = createGzip();
        const writable = createWriteStream(destinationFilePath);

        await pipeline(readable, gzip, writable);

        console.log('File compressed successfully!');
    } catch (error) {
        console.error(`Compression failed: ${error.message}`);
    }
};

await compress();