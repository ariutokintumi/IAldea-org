const fs = require('fs');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');

/**
 * Parsea un archivo PDF y devuelve el texto plano.
 */
async function parsePDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

/**
 * Parsea un archivo Docx y devuelve el texto plano.
 */
async function parseDocx(filePath) {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value;
}

/**
 * Detector de formato y parser universal.
 */
async function parseDocument(filePath) {
  const extension = filePath.split('.').pop().toLowerCase();
  
  if (extension === 'pdf') {
    return await parsePDF(filePath);
  } else if (extension === 'docx') {
    return await parseDocx(filePath);
  } else if (extension === 'txt' || extension === 'md') {
    return fs.readFileSync(filePath, 'utf-8');
  } else {
    throw new Error(`Formato no soportado: .${extension}`);
  }
}

module.exports = {
  parseDocument,
};
