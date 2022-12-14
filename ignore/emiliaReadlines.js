var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as process from 'process';
import * as readline from 'readline';
const spreadsheetData = {
    id: 'spreadsheetId',
    name: 'spreadsheetName',
};
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function getSpreadsheetId(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = yield new Promise((resolve) => {
            rl.question(question, (answer) => resolve(answer));
        });
        spreadsheetData.id = id;
    });
}
function getSpreadsheetName(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield new Promise((resolve) => {
            rl.question(question, (answer) => resolve(answer));
        });
        spreadsheetData.name = name;
    });
}
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield getSpreadsheetId('what is your spreadsheet id?');
    yield getSpreadsheetName('what is your spreadsheet name?');
    rl.close();
});
getData();
export { spreadsheetData };
