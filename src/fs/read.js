import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "fileToRead.txt");

const read = async () => {
    try {
        if (!(await doFileExist(filePath))) {
            throw Error("FS operation failed: file does not exist")
        };
        console.log(await fs.readFile(filePath, { encoding: "utf8" }));
    } catch (err) {
        console.error(err);
    }
};

await read();

async function doFileExist (path) {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}
