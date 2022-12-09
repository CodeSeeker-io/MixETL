import { promises } from 'fs';
import * as path from 'path';
import * as process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { JSONClient } from 'google-auth-library/build/src/auth/googleauth';
import * as readline from 'readline';

const { readFile, writeFile } = promises;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const SHEET_DATA = path.join(process.cwd(), 'data.js');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await readFile(TOKEN_PATH);
    const credentials = JSON.parse(content.toString());
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */


async function saveCredentials(client : OAuth2Client | JSONClient) {
  const content = await readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content.toString());
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client: OAuth2Client | JSONClient = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

const spreadsheetData = { 
  spreadsheetId: 'spreadsheet id', 
  range: 'spreadsheet id',//how can I make this value a num OR string, depending if they want all ranges or only specific ranges 
};

function getSpreadsheetId (question: string) { 
  const rl = readline.createInterface({
      input: process.stdin, 
      output: process.stdout 
  })
  rl.question(question, (answer: string) => {
      spreadsheetData.spreadsheetId = answer;
  })
};

function getSpreadsheetRange (question: string) { 
  const rl = readline.createInterface({
      input: process.stdin, 
      output: process.stdout 
  })
  rl.question('What is your range?', (answer: string) => {
      spreadsheetData.range = answer; 
  })
};
getSpreadsheetId('what is your spreadsheet id?');
getSpreadsheetRange('what is your range?');

 //instead of range, 
/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listMajors(auth: OAuth2Client) {
  const sheets = google.sheets({version: 'v4', auth});
  const res = await sheets.spreadsheets.values.get(spreadsheetData);
  console.log(spreadsheetData)
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    console.log('No data found.');
    return;
  }
  console.log('Name, Major:');
  rows.forEach((row) => {
    // Print columns A and E, which correspond to indices 0 and 4.
    console.log(`${row[0]}, ${row[4]}`);
  });
}
//file that does readline 
//get data and get map functions that woud generate the json that we need 
//don't interact with sheets api at all 

authorize().then(listMajors).catch(console.error);