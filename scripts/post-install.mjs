import prompt from 'prompt';
import chalk from 'chalk';
import path from 'path';
import { promises as fs } from 'fs';
import url from 'url';
import process from 'process';

async function replaceInFiles(searchString, replacement, files) {
    return Promise.all(files.map(async file => {
        const stats = await fs.stat(file);
        if (stats.isFile()) {
            let content = await fs.readFile(file, { encoding: 'utf-8' });
            content = content.replaceAll(searchString, replacement);
            console.log(chalk.greenBright(`... writing ${file}`));
            await fs.writeFile(file, content, { encoding: 'utf-8' });
        } else if (stats.isDirectory()) {
            const contents = await fs.readdir(file);
            await replaceInFiles(searchString, replacement, contents.map(child => `${file}/${child}`));
        }
    }));
}

async function main() {
    if (!process.stdout.isTTY) {
        // return immediately if not in an interactive shell
        return 0;
    }

    const __filename = url.fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { name } = JSON.parse(await fs.readFile(path.resolve(__dirname, '../package.json'), { encoding: 'utf-8' }));

    if (name !== 'aem-react-spa') {
        // the template already got initialised
        return 0;
    }

    console.log();
    console.log(chalk.green('Welcome to the initial setup of the AEM React SPA template.'));
    console.log();

    prompt.start();

    const { appId } = await prompt.get({
        properties: {
            appId: {
                description: 'Application Id (appId)',
                required: true,
            }
        }
    });

    try {
        console.log();
        await Promise.all([
            replaceInFiles('aem-react-spa', appId, ['src', '.env', 'package.json', 'package-lock.json']),
            replaceInFiles('package-lock.json', '', ['.gitignore'])
        ])
        console.log();
        console.log(chalk.green('Successfully initialised template 👏'));

        return 0;
    } catch (err) {
        console.log();
        console.log(chalk.red(`Failed to initialise template: ${err.message || err}`))
        console.log(chalk.red(`Please reset your working copy using git reset --hard and try again.`));
        console.log();
        console.log(err);
        
        return 1;
    }
}

(async function () { process.exit(await main()); })();
