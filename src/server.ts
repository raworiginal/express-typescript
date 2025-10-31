import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(logger("dev"));

app.all("/api/auth/{*any}", toNodeHandler(auth));
app.use(express.json());

app.get("/", (_, res: Response) => {
	res.json({ message: "It works!" }), 200;
});

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});
