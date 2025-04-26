import { Worker } from "worker_threads";
import path from 'path';
import { fileURLToPath } from 'url';
import { cpus } from "os";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workerPath = path.join(__dirname, "./worker.js");

const MIN_INITIAL_VALUE = 10;

const performCalculations = async () => {
    const coreNumber = cpus().length;
    const promisifiedWorkerThreads = [];

    for (let index = 0; index < coreNumber; ++index) {
        promisifiedWorkerThreads.push(new Promise((resolve, reject) => {
            const worker = new Worker(workerPath, { workerData: index + MIN_INITIAL_VALUE });
    
            worker.on("message", (data) => {
                resolve(data);
            });
        
            worker.on("error", (error) => {
                reject();
            })
        }));
    }
    
    const output = [];
    Promise.allSettled(promisifiedWorkerThreads)
        .then((workersResults) => {
            workersResults.forEach((result) => {
                output.push({
                    status: result.status === "fulfilled" ? "resolved" : "error",
                    data: result.value 
                })
            })
            console.log(output);
        }
    );
};

await performCalculations();