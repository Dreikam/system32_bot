const { glob } = require('glob');
const { promisify } = require('util');
const proGlob = promisify(glob);

module.exports = class BotUtils {
    constructor(client){
        this.client = client;
    }

    async loadFiles(dirName){
        const Archives = await proGlob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
        Archives.forEach((archive) => delete require.cache[require.resolve(archive)]);
        return Archives;
    }
}