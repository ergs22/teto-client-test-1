// Helper para verificar si ya existe un mensaje con el mismo ID
const messageExists = (messages: any[], _id: string) => {
  return messages.some((msg) => {
    msg._id === _id;
  });
};

export default messageExists;
