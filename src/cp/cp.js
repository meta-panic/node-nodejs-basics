import { spawn } from 'node:child_process';
import process from 'node:process';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
    const child = spawn('node', [filePath, ...args],
        { stdio: ['pipe', 'pipe', 'inherit'] }
    );

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess( ["someArgument1", "someArgument2"] );
