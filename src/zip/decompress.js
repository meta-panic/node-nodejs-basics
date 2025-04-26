import { Unzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const sourceFilePath = path.join(__dirname, 'files', 'archive.gz');


const decompress = async () => {
    try {
        const readable = createReadStream(sourceFilePath);
        const unzip = Unzip();
        const writable = createWriteStream(destinationFilePath);

        await pipeline(readable, unzip, writable, e => console.log(e));

        console.log('File uncompressed successfully!');
    } catch (error) {
        console.error(`Compression failed: ${error.message}`);
    }
};

await decompress();