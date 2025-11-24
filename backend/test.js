import mongoose from "mongoose";

const user = "orquestra";
const password = "orquestra123";

const uri = `mongodb+srv://${user}:${password}@cluster0.a3wqz0g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas!"))
  .catch(err => console.log("❌ Erro ao conectar:", err));
