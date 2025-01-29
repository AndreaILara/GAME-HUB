export const generateCarton = () => {
  const columns = {
    B: generateUniqueNumbers(1, 15, 5),
    I: generateUniqueNumbers(16, 30, 5),
    N: generateUniqueNumbers(31, 45, 5),
    G: generateUniqueNumbers(46, 60, 5),
    O: generateUniqueNumbers(61, 75, 5),
  };

  // Generar posiciones "FREE" aleatorias (entre todas las posiciones del cartón)
  const freePositions = generateFreePositions();

  freePositions.forEach(([column, index]) => {
    columns[column][index] = "FREE";
  });

  return columns;
};

// Función para generar números únicos dentro de un rango
const generateUniqueNumbers = (min, max, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(numbers);
};

// Función para generar posiciones aleatorias "FREE"
const generateFreePositions = () => {
  const columns = ["B", "I", "N", "G", "O"];
  const freePositions = new Set();

  while (freePositions.size < 3) {
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    const randomIndex = Math.floor(Math.random() * 5);

    // Garantizar que no se repitan posiciones
    freePositions.add(`${randomColumn}-${randomIndex}`);
  }

  return Array.from(freePositions).map((pos) => {
    const [column, index] = pos.split("-");
    return [column, parseInt(index, 10)];
  });
};
