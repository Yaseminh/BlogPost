import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(router);

export { app };
