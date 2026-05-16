import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Por favor, define la variable MONGO_URL en tus variables de entorno",
  );
}

declare global {
  var mongoose:
    | {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Connection> | null;
      }
    | undefined;
}

// 2. Asignamos o inicializamos el contenedor en el objeto global
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connect() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose
      .connect(MONGO_URL!, opts)
      .then((m) => m.connection);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export default connect;
