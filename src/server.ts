import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import logger from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(logger("dev"));

app.get("/", (_, res: Response) => {
	res.json({ message: "fuck off I'm working here!" });
});

app.listen(port, () => {
	console.log(`The server is running at http://localhost:${port}`);
});
