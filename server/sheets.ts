
import { getInput } from './readline';

const spreadsheetCreds: { id: string; name: string } = {
    id: 'spreadsheetId',
    name: 'spreadsheetName',
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
  getSheetCredentials(); 

  export { getSheetCredentials };