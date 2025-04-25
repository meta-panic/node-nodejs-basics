const PREFIX = "RSS_";

const parseEnv = () => {
   return printEnvs(filterEnvsByPrefix(process.env, PREFIX));
};

function filterEnvsByPrefix(envObj, prefix) {
    const filteredEnvs = Object
        .entries(envObj)
        .filter(([env,]) => String(env).startsWith(prefix));

    return Object.fromEntries(filteredEnvs);
}

function printEnvs(envObj) {
    console.log(Object
        .entries(envObj)
        .map(([env, value]) => {
            return `${env}=${value}`;
        })
        .join('; ')
    );
}


parseEnv();