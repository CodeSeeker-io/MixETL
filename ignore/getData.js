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
import * as readline from 'readline';
const { readFile, writeFile } = promises;
const SHEET_DATA = path.join(process.cwd(), 'data.js');
const spreadsheetData = {
    spreadsheetId: 'spreadsheet id',
    range: 'spreadsheet id',
};
function getUserInfo(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('what is your spreadsheet id?', (answer) => {
        spreadsheetData.spreadsheetId = answer;
    });
    rl.question('What is your spreadsheet name?', (answer) => {
        spreadsheetData.range = answer;
    });
}
;
function getData(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = google.sheets({ version: 'v4', auth });
        const res = yield sheets.spreadsheets.values.get(spreadsheetData);
        yield writeFile(SHEET_DATA, res);
    });
}
;
