#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';
import { downloadEpisode, downloadEpisodes, findEpisodes, search, log } from 'vistopia-api';

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
    .option('-e, --episode <episode_id>')
    .option('-o --output <output directory>')
    .action((options) => {
        // download one episode
        const { output = './resources', episode } = options;
        if (output) {
            // output_dir = ;
            log('output: ', output);
        }
        if (episode) {
            log('episode: ', episode);
            downloadEpisode(episode, output);
            return;
        }
        downloadEpisodes(getLastArg(), output);
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


function getLastArg(): string {
    const arg_len = program.args.length;
    return program.args[arg_len - 1];
}