import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const createMap = (input: string[]) => {};

const getInput = async (): Promise<string[]> => {
  const input: string[] = [];
  const rl = readline.createInterface(stdin, stdout);
  const questions: string[] = [
    'What is your spreadsheet id?',
    'What is your spreadsheet name'
  ];
  let answer: string;
  for (let i = 0; i < questions.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    answer = await rl.question(`${questions[i]} \t`);
    input.push(answer);
  }
  rl.close();
  return input;
};

const main = async () => {
  const results = await getInput();
  console.log(results);
};
main();
export { createMap, getInput };