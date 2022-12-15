var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
const createMap = (input) => { };
const getInput = (questions) => __awaiter(void 0, void 0, void 0, function* () {
    const input = [];
    const rl = readline.createInterface(stdin, stdout);
    for (let i = 0; i < questions.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const answer = yield rl.question(`${questions[i]} \t`);
        input.push(answer);
    }
    rl.close();
    return input;
});
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
