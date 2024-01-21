#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';
import { downloadEpisode, downloadEpisodes, findEpisodes, search, log } from 'vistopia-api';
import { existsSync } from 'node:fs';

const program = new Command();

program.name('vispotia')
    .description('CLI to fetch vistopia audio utilities')
    .version(`${require('../package.json').version}`, '-v --version');
    
program.command('search')
    .description('search collection id by keyword')
    .argument('<keyword>', 'show start info')
    .action((keyword, options) => {
        console.log('keyword:', keyword);
        search(keyword);
    });

program.command('find')
    .argument('<collection_id>', 'collection id')
    .description('find all episode by collection id.')
    .action((collection_id, options) => {
        findEpisodes(collection_id);
    });

program.command('download')
    .description('download audio collection by collection id.')
    .argument('<collection_id>', 'collection id')
    .option('-e, --episode <episode_id>')
    .option('-o --output <output directory>')
    .action(async (collection_id, options) => {
        // download one episode
        let { output, episode } = options;
        if (!output) {
            output = await cur_dir();
        }
        if (!existsSync(output)) {
            log(`${output} is not exists.`);
            return;
        }
        if (episode) {
            log('episode: ', episode);
            downloadEpisode(episode, output);
            return;
        }
        if (!collection_id) {
            log(`${collection_id} can not be null.`);
            return;
        }
        downloadEpisodes(collection_id, output);
    });

program.command('push')
    .description('push audios in resources folder to android sdcard')
    .argument('<directory of resources>', 'directory of resources')
    .argument('<directory of phone>', 'directory of android phone that you wan to output.')
    .action((dir_res, dir_phone, optoins) => {
        if (program.args.length < 2) {
            log('can not less two arguments.');
            return;
        }
        const shell = `zsh ./scripts/send2phone.zsh ${dir_res} ${dir_phone}`;
        log(`shell script: ${shell}`);
        exec(shell, (err, stdout, stderr) => {
            if (err) {
                // @ts-ignore
                log(`stderr: ${stderr}`);
                throw new Error('occur error');
            }
            log('shell execute success.');
            log(`stdout: ${stdout}`);
        });
    });

program.parse(process.argv);

async function cur_dir(): Promise<string> {
    return new Promise((resolve, reject) => {
        exec("echo ${PWD}", (err, stdout, stderr) => {
            if (err) {
                // @ts-ignore
                log(`stderr: ${stderr}`);
                reject(err);
                return;
            }
            resolve(stdout.trim());
        });
    });
}