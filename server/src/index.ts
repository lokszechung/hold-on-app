import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cookieParser());

// app.use((req, _res, next) => {
// 	console.log("Cookies: ", req.cookies);
// 	next();
// });

app.use(express.json());

const corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/auth", authRouter);

app.listen(2904, () => {
	console.log("Server is running on port 2904");
});
