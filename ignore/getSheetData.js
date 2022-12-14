const spreadsheetData = {
    id: 'spreadsheetId',
    name: 'spreadsheetName',
};
const transfer = (input, key) => {
    const initialVal = {};
    return input.reduce((obj, item) => {
        return Object.assign(Object.assign({}, obj), { [item[key]]: item });
    }, initialVal);
};
console.log(transfer(results));
export {};
