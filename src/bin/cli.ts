#!/usr/bin/env node

import { Command } from 'commander';
import { exec } from 'child_process';
import { fetchAudiosFromCollection, fetchEpisodes, search } from '../api';
import { log } from '../logs';

const program = new Command();

program.name('vispotia')
    .description('CLI to fetch vistopia audio utilities')
    .version('0.0.1');
    
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
        fetchEpisodes(getLastArg());
    });

program.command('download')
    .description('download audio collection by collection id.')
    .action((optoins) => {
        fetchAudiosFromCollection(getLastArg());
    });

program.command('push')
    .description('push audios in resources folder to android sdcard')
    .action((optoins) => {
        exec('zsh ./scripts/send2phone.zsh', (err, stdout, stderr) => {
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