import { app } from "./app";
import { config } from "dotenv";
import { MongoClient } from "./database/mongo";

config();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server runs at ${port} 🚀🚀🚀`);
});

const handleExit = () => {
  console.log("Server closed 🚨🚨🚨");
  server.close(() => {
    process.exit(0);
  });
};

// Lida com sinais de encerramento do processo
process.on("SIGINT", handleExit);

(async () => {
  try {
    await MongoClient.connect();
    console.log(`Connected to MongoDB 🍃`);
  } catch (error) {
    console.error("Error while connection to MongoDB:", error);
    handleExit(); // Encerra o servidor em caso de erro na conexão
  }
})();
