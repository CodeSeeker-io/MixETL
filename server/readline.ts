import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const createMap = (input: string[]) => {};

const getInput = async (questions: string[]): Promise<string[]> => {
  const input: string[] = [];
  const rl = readline.createInterface(stdin, stdout);
 
  for (let i = 0; i < questions.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const answer = await rl.question(`${questions[i]} \t`);
    input.push(answer);
  }
  rl.close();
  return input;
};

export { createMap, getInput };


/* cannot figure out a ts-safe way to create an object
instead of an array, because you ts wants you to define 
object properties right off the bat */ 


// const main = async () => {
//   const results = await getInput();
//   console.log(results);
//   return results;
// };
// main();


// const spreadsheetCreds: { id: string; name: string } = {
//   id: 'spreadsheetId',
//   name: 'spreadsheetName',
// };

// const getSheetCredentials = async () => {
//   const res = await getInput(); 
//   res.map((answer, i) => { 
//     for(let prop in spreadsheetCreds) {
//       prop = answer[i];
//     }
//   })
//   console.log(spreadsheetCreds)
// }
// getSheetCredentials(); 


