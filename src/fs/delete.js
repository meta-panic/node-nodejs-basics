import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = concatPath(concatPath(__dirname, "files"), "fileToRemove.txt");

const remove = async () => {
    try {
        if (!(await doFileExist(filePath))) {
            throw Error("FS operation failed: file to delete was probably already deleted")
        };

        await fs.rm(filePath);
    } catch (err) {
        console.error(err);
    }
};

await remove();

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

function concatPath(directory, appendix) {
    return path.join(directory, appendix);
}