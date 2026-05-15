/**
 * Divide el texto en fragmentos (chunks) de un tamaño aproximado.
 * @param {string} text Texto completo a dividir.
 * @param {number} size Tamaño máximo del chunk (en caracteres para este MVP).
 * @param {number} overlap Cantidad de caracteres que se repiten entre chunks.
 */
function chunkText(text, size = 2000, overlap = 200) {
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = start + size;
    
    // Intentar no cortar a mitad de una palabra si es posible
    if (end < text.length) {
      const lastSpace = text.lastIndexOf(' ', end);
      if (lastSpace > start) {
        end = lastSpace;
      }
    }

    chunks.push(text.slice(start, end).trim());
    start = end - overlap; // Retroceder el overlap para mantener contexto
    
    // Evitar bucles infinitos si el overlap es >= size
    if (start >= end) start = end; 
  }

  return chunks.filter(c => c.length > 0);
}

module.exports = {
  chunkText,
};
