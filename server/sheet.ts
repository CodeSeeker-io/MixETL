
import { getInput } from './readline';

/* Get data user spreadsheet credentials */ 

const spreadsheetCreds: { spreadsheetId: string; range: string } = {
    spreadsheetId: 'spreadsheetId',
    range: 'spreadsheetName',
  };

const questions: string[] = [
    'What is your spreadsheet id?',
    'What is your spreadsheet name?',
];

const getSheetCredentials = async () => {
    const res = await getInput(questions); 
    res.map((answer, i) => { 
      for(let prop in spreadsheetCreds) {
        prop = answer[i];
      }
    })
    console.log(spreadsheetCreds)
  }

  export { getSheetCredentials, spreadsheetCreds };