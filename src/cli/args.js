const KEY_PREFIX = "--";

const parseArgs = () => {
    const appArgs = getAppArgs(process.argv)
    printAppArgs(appArgs);
};

function getAppArgs(args) {
    const [, , ...appArgs] = args;
    return appArgs;
}

function printAppArgs(args) {
    const result = [];
    args.forEach((v, index, arr) => {
        if(!String(v).startsWith(KEY_PREFIX)) {
            return;
        }

        const valueIndex = index + 1;
        if (arr.length >= valueIndex) {
            result.push(`${v} is ${arr[index + 1]}`)
        }
    })

    console.log(result.join(", ").trim());
}


parseArgs();
