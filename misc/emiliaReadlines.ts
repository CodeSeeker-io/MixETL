/* eslint-disable import/prefer-default-export */
import * as process from 'process';
import * as readline from 'readline';

const spreadsheetData: { id: string; name: string } = {
  id: 'spreadsheetId',
  name: 'spreadsheetName',
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getSpreadsheetId(question: string) {
  const id: string = await new Promise((resolve) => {
    rl.question(question, (answer: string) => resolve(answer));
  });
  spreadsheetData.id = id;
}

async function getSpreadsheetName(question: string) {
  const name: string = await new Promise((resolve) => {
    rl.question(question, (answer: string) => resolve(answer));
  });
  spreadsheetData.name = name;
}

const getData = async () => {
  await getSpreadsheetId('what is your spreadsheet id?');
  await getSpreadsheetName('what is your spreadsheet name?');
  rl.close();
};

getData();

export { spreadsheetData };
