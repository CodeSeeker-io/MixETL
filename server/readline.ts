import * as process from 'process';
import * as readline from 'readline';

//work flow

//user will fill in a mixpanel object so they don't have to keep filling it in ?
//check if we have their credentials saved. otherwise, call readline to get mixpanel info

//main function that will call the readline function to get the spreadsheet data
//call the authorization script in gsheets
//readline function for mapping data from user
//call a mapping function which is going to take the object from the last call of readline and
//will add information to it
//once we have that, we need some function that does the transformation
//when transformation is complete, we just need to send it to mixpanel (call the logic in
//export.ts)

const spreadsheetData: { id: string; name: string } = {
  id: 'spreadsheetId',
  name: 'spreadsheetName',
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getSpreadsheetId(question: string) {
  await new Promise((resolve) =>
    rl.question(question, (answer: string) => {
      resolve((spreadsheetData.id = answer));
    })
  );
}

async function getSpreadsheetName(question: string) {
  await new Promise((resolve) =>
    rl.question(question, (answer: string) => {
      resolve((spreadsheetData.name = answer));
    })
  );
}

const getData = async () => {
  await getSpreadsheetId('what is your spreadsheet id?');
  await getSpreadsheetName('what is your spreadsheet name?');
  rl.close();
  console.log(spreadsheetData);
};

getData();

//file that does readline
//get data and get map functions that woud generate the json that we need
//don't interact with sheets api at all
// console.log(spreadsheetData);

// export function getSpreadsheetRange(question: string) {
//   const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
//   rl.question('What is your range?', (answer: string) => {
//     spreadsheetData.range = answer;
//   })
// //   rl.close()
// };

// const questions = [
//     'what is your spreadsheet id?',
//     'what is your spreadsheet name?'
// ];
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
//   });
// const ask = (question: string) => {
//     return new Promise(resolve => rl.question(question, resolve));
// };
// const getInput = async (questions:[]) => {
//     const answers:[] = [];
//     for (let q of questions) {
//         spreadsheetData.spreadsheetId = answers[0];
//     }
// }

// async function input(question: string, callback: Function) {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });
//     await new Promise ((callback, error) => rl.question(question, (answer:string) => {
//         callback(answer);
//     }, () => {
//         error
//     }))
// };

// const main = async () => {
//     const id = await input ('what is your spreadsheet id?', () => spreadsheetData.spreadsheetId = answer);
// }
