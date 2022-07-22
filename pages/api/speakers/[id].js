import path from "path";
import fs, { read } from "fs";

const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export default async function handler(req, res) {
  //   res.status(200).json(data);

  const method = req?.method;
  const id = parseInt(req?.query.id);
  const recordFromBody = req?.body;
  const jsonFile = path.resolve("C:\\Users\\kkhar\\Desktop\\dashboard-react", "db.json");

  switch (method) {
    case "POST":
      await postMethod();
      break;
    case "PUT":
      await putMethod();
      break;
    case "DELETE":
      await deleteMethod();
      break;
    default:
      res.status(301).send(`Method ${method} not implemented`);
      console.log(`Method ${method} not implemented`);
  }

  async function putMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        console.log("record from body:", recordFromBody);
        const newSpeakerArray = speakers.map(function (rec) {
          return rec.id === id ? recordFromBody : rec;
        });
        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakerArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(speakers, null, 2));
        console.log(`PUT /api/speakers/${id} status:200`);
      }
    } catch (ex) {
      console.log("/api/speaker error:", ex);
      res
        .status(500)
        .send(`PUT /api/speakers/${id} status:500 unexpected error`);
    }
  }

  async function postMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const idNew =
          speakers.reduce((accumulator, currentValue) => {
            const idCurrent = parseInt(currentValue.id);
            return idCurrent > accumulator ? idCurrent : accumulator;
          }, 0) + 1;

        const newSpeakerRec = { ...recordFromBody, id: idNew.toString() };
        const newSpeakerArray = [newSpeakerRec, ...speakers];
        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakerArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(newSpeakerRec, null, 2));
        console.log(`POST /api/speakers/${id} status:200`);
      }
    } catch (ex) {
      console.log("/api/speaker error:", ex);
      res
        .status(500)
        .send(`POST /api/speakers/${id} status:500 unexpected error`);
    }
  }

  async function deleteMethod() {
    try {
      const readFileData = await readFile(jsonFile);
      await delay(1000);
      const speakers = JSON.parse(readFileData).speakers;
      if (!speakers) {
        res.status(404).send("Error: Request failed with status code 404");
      } else {
        const newSpeakerArray = speakers.filter(function (rec) {
          return rec.id != id;
        });
        writeFile(
          jsonFile,
          JSON.stringify({ speakers: newSpeakerArray }, null, 2)
        );
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify(speakers, null, 2));
        console.log(`DELETE /api/speakers/${id} status:200`);
      }
    } catch (ex) {
      console.log("/api/speaker error:", ex);
      res
        .status(500)
        .send(`DELETE /api/speakers/${id} status:500 unexpected error`);
    }
  }
}
