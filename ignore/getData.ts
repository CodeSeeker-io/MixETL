//get spreadsheet ID by getting link to the spreadsheet 
//(iterate on this later using google drive and sheets api)
//get data and then prompt user for input in order to build mapper object 

import { promises } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as readline from 'readline';

const { readFile, writeFile } = promises;

const SHEET_DATA = path.join(process.cwd(), 'data.js');

const spreadsheetData = { 
    spreadsheetId: 'spreadsheet id', 
    range: 'spreadsheet id',//how can I make this value a num OR string, depending if they want all ranges or only specific ranges 
};

function getUserInfo (question: string) { 
    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout 
    })
    rl.question('what is your spreadsheet id?', (answer: string) => {
        spreadsheetData.spreadsheetId = answer;
    });
    rl.question('What is your spreadsheet name?', (answer: string) => {
        spreadsheetData.range = answer; 
    })
};
// async function readlineAsync (question: string) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     })
//     return new Promise((resolve) => {
//         rl.question(question, (answer) => {
//           rl.close()
//           resolve(answer)
//         })
//     })
// };

async function getData(auth: OAuth2Client) {
    const sheets = google.sheets({version: 'v4', auth});
    const res = await sheets.spreadsheets.values.get(
        spreadsheetData
      );
    await writeFile(SHEET_DATA, res); 
};
//   const code = await readlineAsync('Enter the code from that page here: ')

/**
//  * Get data from spreadsheet:
//  * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//  * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
//  */
//  async function listMajors(auth: OAuth2Client) {
//     const sheets = google.sheets({version: 'v4', auth});
//     const res = await sheets.spreadsheets.values.get({
//       spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
//       range: 'Class Data!A2:E',
//     });
//     const rows = res.data.values;
//     if (!rows || rows.length === 0) {
//       console.log('No data found.');
//       return;
//     }
//     console.log('Name, Major:');
//     rows.forEach((row: string) => {
//       // Print columns A and E, which correspond to indices 0 and 4.
//       console.log(`${row[0]}, ${row[4]}`);
//     });
//   }
  
//   authorize().then(listMajors).catch(console.error);