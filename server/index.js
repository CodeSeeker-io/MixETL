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
import { getSheetCredentials, sheetCredentials } from './sheet.js';
const { readFile, writeFile } = promises;
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SHEET_DATA = path.join(process.cwd(), 'data.json');
/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
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
/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
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
/**
 * Load or request or authorization to call APIs.
 *
 */
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
/**
 * Get spreadsheet credentials, make a GSheets GET request using these credentials,
 *  and print the spreadsheet data to a local file 'data.js'
 *
 */
function writeData(auth) {
    return __awaiter(this, void 0, void 0, function* () {
        getSheetCredentials();
        const sheetData = google.sheets({ version: 'v4', auth });
        const res = yield sheetData.spreadsheets.values.get(sheetCredentials);
        yield writeFile(SHEET_DATA, res.toString());
    });
}
authorize().then(writeData).catch(console.error);
// /**
//  * Prints the names and majors of students in a sample spreadsheet:
//  * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
//  * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
//  */
// async function listMajors(auth: OAuth2Client) {
//   const sheets = google.sheets({version: 'v4', auth});
//   const res = await sheets.spreadsheets.values.get(spreadsheetCreds);
//   const rows = res.data.values;
//   if (!rows || rows.length === 0) {
//     console.log('No data found.');
//     return;
//   }
//   console.log('Name, Major:');
//   rows.forEach((row) => {
//     // Print columns A and E, which correspond to indices 0 and 4.
//     console.log(`${row[0]}, ${row[4]}`);
//   });
// }
