import { createMap, getInput, main } from '../server/readline';

const spreadsheetData: { id: string; name: string } = {
  id: 'spreadsheetId',
  name: 'spreadsheetName',
};

const transfer = (input: string[], key: string) => {
  const initialVal = {};
  return input.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialVal);
};
console.log(transfer(results))