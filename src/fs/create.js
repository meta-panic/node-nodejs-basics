import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files","fresh.txt");

const fileContent = 'I am fresh and young';

const create = async () => {
    try {
        if(await doFileExist(filePath)) {
            throw new Error("FS operation failed: the file is already created");
        }
        await fs.writeFile(filePath, fileContent);
        console.log('File created and written successfully!');
    } catch (err) {
        console.error(err);
    }
};

await create();

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
