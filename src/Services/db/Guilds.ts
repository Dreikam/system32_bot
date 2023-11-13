import * as fs from "fs";

let database = [
  {
    id: "1",
    name: "Zeew Space",
  },
];

export class GuildServices {
  getGuild(id: string) {
    return database.find((guild) => guild.id == id);
  }
  createGuild(data: any) {
    const jsonData = JSON.stringify(data);

    fs.writeFile("user.json", jsonData, (error) => {
      if (error) return console.error(error);
    });
  }
  editGuild(data: any) {}
  deleteGuild(id: string) {}
}
