import * as fs from 'node:fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
const sourceDirectoryPath = path.join(__dirname, "files");
const destinationDirectoryPath = path.join(__dirname, "files_copy");


const copy = async () => {
    try {
        if (!(await doFolderExist(sourceDirectoryPath))) {
            throw Error("FS operation failed: source folder does not exist")
        };
        if (await doFolderExist(destinationDirectoryPath)) {
            throw Error("FS operation failed: destination folder already exists")
        };

        await copyFolder(sourceDirectoryPath, destinationDirectoryPath);
    } catch (err) {
        console.error(err);
    }
};

const doFolderExist = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false
        }
        throw err;
    }
}

const copyFolder = async (sourcePath, destinationPath) => {
    await fs.cp(sourcePath, destinationPath, { recursive: true });
}

await copy();

