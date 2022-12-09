//get spreadsheet ID by getting link to the spreadsheet 
//(iterate on this later using google drive and sheets api)
//get data and then prompt user for input in order to build mapper object 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { promises } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { google } from 'googleapis';
const { readFile, writeFile } = promises;
const SHEET_DATA = path.join(process.cwd(), 'data.json');
const spreadsheetData = {
    spreadsheetId: 'spreadsheet id',
    range: 'spreadsheet id', //how can I make this value a num OR string, depending if they want all ranges or only specific ranges 
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
function getData(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = google.sheet({ version: 'v4', auth });
        const res = yield sheets.spreadsheets.values.get({
            spreadsheetData
        });
        yield writeFile(SHEET_DATA, res);
    });
}
;
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
