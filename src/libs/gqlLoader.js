import fs from 'fs';
import glob from 'glob';

function getGlob(pattern) {
  return glob.sync(pattern);
}

function readFile(fileName) {
  return fs.readFileSync(fileName, 'utf8');
}

function makeSchema(fileNames) {
  return fileNames.map(readFile);
}

export default function (pattern) {
  try {
    const files = getGlob(pattern);
    const schemaFile = makeSchema(files);
    return schemaFile;
  } catch (err) {
    return err;
  }
}
