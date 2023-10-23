import express from "express";
import cors from "cors";
import {router as api} from "./api";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", api);

export default app;
