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
const getInput = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = [];
    const rl = readline.createInterface(stdin, stdout);
    const questions = [
        'What is the name of your event column?',
        'What is the name of your distinct_id column?',
        'Do you have a time column?',
        'What is the name of your event column?',
    ];
    let answer;
    for (let i = 0; i < questions.length; i++) {
        answer = yield rl.question($, { questions, [i]:  }, t);
        input.push(answer);
    }
    rl.close();
    return input;
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield getInput();
    console.log(results);
});
main();
export { createMap, getInput };
