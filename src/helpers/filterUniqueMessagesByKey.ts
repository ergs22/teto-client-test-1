export default function filterUniqueMessagesByKey(
  messagesArray: any,
  uniqueKey: any
) {
  const countMap = new Map(); // Mapa para contar ocurrencias de cada identificador

  // Contar ocurrencias de cada identificador
  messagesArray.forEach((message: any) => {
    const id = message[uniqueKey];
    countMap.set(id, (countMap.get(id) || 0) + 1);
  });

  // Filtrar y devolver solo los objetos que aparecen una vez o no tienen el campo único
  return messagesArray.filter((message: any) => {
    const id = message[uniqueKey];
    return countMap.get(id) === 1; // Incluye objetos sin ID
  });
}
