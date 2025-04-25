import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const destinationDirectoryPath = path.join(__dirname, "files");

const wrongFileName = "wrongFilename.txt";
const rightFileName = "properFilename.md";

const rename = async () => {
    try {
        if (!(await doFileExist(genPath(wrongFileName)))) {
            throw Error("FS operation failed: file with wrong name does not exist")
        }
        if (await doFileExist(genPath(rightFileName))) {
            throw Error("FS operation failed: file with right name already exists")
        }

        await fs.rename(genPath(wrongFileName), genPath(rightFileName));
    } catch(err) {
        console.log(err);
    }
};

function genPath(appendix) {
    return path.join(destinationDirectoryPath, appendix);
}

await rename();

async function doFileExist (path) {
    try {
        await fs.access(path);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}
