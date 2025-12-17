import mongoose from "mongoose";

async function database() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI  || "mongodb://localhost:27017/authdb"
    );
    console.log("Connection à la db réussite ✅");
  } catch (error) {
    console.log("Erreur de connexion à la db: ", error.message);
  }
}

export default database;
