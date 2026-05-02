const fs = require('node:fs');
const path = require('node:path'); 
const dataProcessor = require('./data-processor.js')

const filePath = path.resolve('./input.json');
const outPath = path.resolve('./output.json');

fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;

    const parsedData = JSON.parse(data);
    const processedData = dataProcessor(parsedData);

    const result = JSON.stringify(processedData, null, 2);
    fs.writeFile(outPath, result, (err) => {
        if (err) throw err;
        console.log("Writed");
    })
});
