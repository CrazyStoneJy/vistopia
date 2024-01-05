#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';
import { downloadEpisode, downloadEpisodes, findEpisodes, search } from './api';
import { log } from './logs';

const program = new Command();

program.name('vispotia')
    .description('CLI to fetch vistopia audio utilities')
    .version(`${require('../package.json').version}`, '-v --version');
    
program.command('search')
    .description('search collection id by keyword')
    .option('-k, --keyword', 'show start info')
    .action((options) => {
        console.log(options);
        console.log('keyword:', getLastArg());
        search(getLastArg());
    });

program.command('find')
    .description('find all episode by collection id.')
    .action((options) => {
        findEpisodes(getLastArg());
    });

program.command('download')
    .description('download audio collection by collection id.')
    .option('-e, --episode <episode_id>')
    .action((optoins) => {
        // download one episode
        if (optoins.episode) {
            downloadEpisode(getLastArg());
            return;
        }
        downloadEpisodes(getLastArg());
    });

program.command('push')
    .description('push audios in resources folder to android sdcard')
    .option('-d, --destination <sdcard floder of android phone>')
    .action((optoins) => {
        const dir_path = getLastArg();
        const shell = `zsh ./scripts/send2phone.zsh ${dir_path}`;
        log(`shell script: ${shell}`);
        exec(shell, (err, stdout, stderr) => {
            if (err) {
                // @ts-ignore
                log(err);
                throw new Error('occur error');
            }
            log('shell execute success.');
            log(`stdout: ${stdout}`);
            log(`stderr: ${stderr}`);
        });
    });

program.parse(process.argv);


function getLastArg(): string {
    const arg_len = program.args.length;
    return program.args[arg_len - 1];
}