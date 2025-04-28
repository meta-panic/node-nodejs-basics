import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const folderPath = path.join(__dirname, "files");

const list = async () => {
    try {
        if (!(await doFolderExist(folderPath))) {
            throw Error("FS operation failed: folder does not exist")
        };
        console.log(await getAllFilenamesAt(folderPath));
    } catch (err) {
        console.error(err);
    }
};

await list();

async function getAllFilenamesAt(folderPath) {
    return await fs.readdir(folderPath, { recursive: true });
}

async function doFolderExist(path) {
    try {
        await fs.access(path);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false
        }
        return false;
    }
}
