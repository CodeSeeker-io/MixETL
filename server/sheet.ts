
import { getInput } from './readline';

/* Get data user spreadsheet credentials */ 

const spreadsheetCreds: { spreadsheetId: string; range: string } = {
    spreadsheetId: 'spreadsheetId',
    range: 'spreadsheetName',
  };

const getSheetCredentials = async () => {
    const res = await getInput(); 
    res.map((answer, i) => { 
      for(let prop in spreadsheetCreds) {
        prop = answer[i];
      }
    })
    console.log(spreadsheetCreds)
  }
//   getSheetCredentials(); 

  export { getSheetCredentials, spreadsheetCreds };