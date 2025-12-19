import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import auth_routes from "./routes/auth.routes.js";
import user_routes from "./routes/user.routes.js";
import database from "./database/db.js";

const app = express();
// dotenv.config({ debug: true });
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// Middlewares
app.use(express.json());
app.use(cookieParser());
database();

// Routes
app.use("/api/auth", auth_routes);
app.use("/api/user", user_routes);

app.listen(process.env.PORT, () => {
  console.log(`Server start in http://localhost:${process.env.PORT}`);
});
