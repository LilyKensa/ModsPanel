import * as express from "express";
import * as fs from "node:fs";
import * as Path from "node:path";
import * as JSZip from "jszip";

enum Env {
  PORT = 8070,
  MODS_FOLDER = "../mods/"
}

async function reloadModsList() {
  let modsList: Array<ModData> = [];
  for (let file of await fs.promises.readdir(Env.MODS_FOLDER)) {
    let extname = Path.extname(file);
    if (extname !== ".jar") continue;

    let jar = await fs.promises.readFile(Path.join(Env.MODS_FOLDER, file));
    let zipFolder = await Zip.loadAsync(jar);

    const modDataFile = zipFolder.file("fabric.mod.json");
    if (modDataFile === null) continue;

    const modData = JSON.parse(await modDataFile.async("string"));

    modsList.push({
      id: modData.id,
      version: modData.version,
      name: modData.name,
      description: modData.description,
      depends: modData.depends,
      breaks: modData.breaks
    });
  }

  await fs.promises.writeFile("./data/ModsListCache.json", JSON.stringify(modsList, null, 4));
  return modsList;
}

let getModsList = async () => JSON.parse((await fs.promises.readFile("./data/ModsListCache.json")).toString());

reloadModsList();

const server = express();

const Zip = new JSZip();

server.use(express.static(Path.join(__dirname, "public")));

server.get("/", async (req, res) => {
  res.sendFile("./Page/index.html", { root: __dirname });
});

interface ModData {
  id: string,
  version: string,
  name: string,
  description: string,
  depends: Record<string, string>,
  breaks: Record<string, string>
}

server.get("/get_modslist", async (req, res) => {
  res.send(await getModsList());
});

server.post("/refresh_modslist", async (req, res) => {
  await reloadModsList();
  res.redirect("/");
});

server.listen(Env.PORT);
