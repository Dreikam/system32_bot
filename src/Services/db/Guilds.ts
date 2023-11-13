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
  editGuild(data: any) {
    const index = database.findIndex((guild) => guild.id == data.id);
    
    return database[index] = data;
  }
  deleteGuild(id: string) {
    const guild = database.find((guild) => guild.id == id);
    const index = database.indexOf(guild)
    if(guild.id == id) {
      return database.splice(index, 1)
    }
  }
}
