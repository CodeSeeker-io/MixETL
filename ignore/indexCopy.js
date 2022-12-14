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
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import * as readline from 'readline';
const { readFile, writeFile } = promises;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SHEET_DATA = path.join(process.cwd(), 'data.js');
function loadSavedCredentialsIfExist() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const content = yield readFile(TOKEN_PATH);
            const credentials = JSON.parse(content.toString());
            return google.auth.fromJSON(credentials);
        }
        catch (err) {
            return null;
        }
    });
}
function saveCredentials(client) {
    return __awaiter(this, void 0, void 0, function* () {
        const content = yield readFile(CREDENTIALS_PATH);
        const keys = JSON.parse(content.toString());
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        yield writeFile(TOKEN_PATH, payload);
    });
}
function authorize() {
    return __awaiter(this, void 0, void 0, function* () {
        let client = yield loadSavedCredentialsIfExist();
        if (client) {
            return client;
        }
        client = yield authenticate({
            scopes: SCOPES,
            keyfilePath: CREDENTIALS_PATH,
        });
        if (client.credentials) {
            yield saveCredentials(client);
        }
        return client;
    });
}
const spreadsheetData = {
    spreadsheetId: 'spreadsheet id',
    range: 'spreadsheet id',
};
function getSpreadsheetId(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(question, (answer) => {
        spreadsheetData.spreadsheetId = answer;
    });
}
;
function getSpreadsheetRange(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('What is your range?', (answer) => {
        spreadsheetData.range = answer;
    });
}
;
getSpreadsheetId('what is your spreadsheet id?');
getSpreadsheetRange('what is your range?');
function listMajors(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        const sheets = google.sheets({ version: 'v4', auth });
        const res = yield sheets.spreadsheets.values.get(spreadsheetData);
        console.log(spreadsheetData);
        const rows = res.data.values;
        if (!rows || rows.length === 0) {
            console.log('No data found.');
            return;
        }
        console.log('Name, Major:');
        rows.forEach((row) => {
            console.log(`${row[0]}, ${row[4]}`);
        });
    });
}
authorize().then(listMajors).catch(console.error);
