const fs = require('node:fs');
const path = require('node:path');
const templateEngine = require('./templateEngine.js');

const filePath = path.resolve("./template.txt");
const outputPath = path.resolve("./output.txt");

const variables = {
    name: "Bob",
    company: "TechCorp",
    city: "Paris",
    role: "Backend Developer",
};

const data = fs.readFileSync(filePath, 'utf-8');
const parsedData = templateEngine(data,variables);

fs.writeFileSync(outputPath, parsedData);