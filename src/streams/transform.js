import { pipeline, Transform } from 'stream';


const transform = async () => {
    const readable = process.stdin;
    const writable = process.stdout;

    const reverse = new Transform({
        transform(chunk, encoding, callback) {
          callback(null, String(chunk).split("").reverse().join(""));
        },
      });

    pipeline(
        readable,
        reverse,
        writable,
        (e) => console.error(e)
    ); 
};

await transform();

