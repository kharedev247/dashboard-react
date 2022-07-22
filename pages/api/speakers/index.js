import path from "path";
import fs, { read } from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function handler(req, res) {
//   res.status(200).json(data);
const jsonFile = path.resolve('C:\\Users\\kkhar\\Desktop\\dashboard-react', 'db.json');

try {
    const readFileData = await readFile(jsonFile);
    await delay(1000);
    const speakers = JSON.parse(readFileData).speakers;
    if (speakers)
    {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(speakers, null, 2));
        console.log("GET /api/speakers status:200");
    }
}
catch(ex) {
    console.log("/api/speaker error:",ex);
    res.status(404).send("File not found on server");
}
}
