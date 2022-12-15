var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getInput } from './readline.js';
/* Get data user spreadsheet credentials */
const sheetCredentials = {
    spreadsheetId: 'spreadsheetId',
    range: 'spreadsheetName',
};
const questions = [
    'What is your spreadsheet id?',
    'What is your spreadsheet name?',
];
const getSheetCredentials = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield getInput(questions);
    res.map((answer, i) => {
        for (let prop in sheetCredentials) {
            prop = answer[i];
        }
    });
    console.log(sheetCredentials);
});
export { getSheetCredentials, sheetCredentials };
