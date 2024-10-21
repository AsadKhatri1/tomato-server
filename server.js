import express from "express";
import cors from "cors";

// app config
const app = express();
const port = 4000;

// middlewear

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => {
  console.log(`App is up and running at port ${port}`);
});
