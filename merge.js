const fs = require('fs');
const path = require('path');

const directoryPath = './src'; // Root directory of your React project
const outputPath = './output.js'; // Output file for combined code

let combinedCode = '';

// Function to read all files recursively
const readFilesRecursively = (dir) => {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // If it's a directory, recursively read its contents
      readFilesRecursively(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      // If it's a .js or .jsx file, read and append its contents
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      combinedCode += `\n\n// File: ${filePath}\n${fileContent}`;
    }
  });
};

// Start reading from the root directory
readFilesRecursively(directoryPath);

// Write combined code to the output file
fs.writeFileSync(outputPath, combinedCode);
console.log(`Combined code saved to ${outputPath}`);
