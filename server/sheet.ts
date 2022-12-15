import { getInput } from './readline.js';

/* Get data user spreadsheet credentials */

const sheetCredentials: { spreadsheetId: string; range: string } = {
  spreadsheetId: 'spreadsheetId',
  range: 'spreadsheetName',
};

const questions: string[] = [
  'What is your spreadsheet id?',
  'What is your spreadsheet name?',
];

const getSheetCredentials = async () => {
  const res = await getInput(questions);
  for (let i = 0; i < res.length; i++) {
    Object.keys(sheetCredentials).forEach((key) => {
      sheetCredentials[key as keyof typeof sheetCredentials] = res[i++];
    });
  }
  return sheetCredentials;
};

getSheetCredentials();

export { getSheetCredentials, sheetCredentials };
