import * as fs from "fs";
import { db } from "../db";

export class GuildServices {
  async getGuild(id: string) {
    const getGuild = await db.guild.findUnique({
      where: {
        id,
      },
    });

    return getGuild;
  }
  async createGuild(data: any) {
    const newGuild = await db.guild.create({
      data,
    });

    return newGuild;

    // let getGuld = database.read();
    // if (!getGuld[data.id]) {
    //   getGuld[data.id] = data;
    // }
    // database.write(getGuld);
    // return getGuld[data.id];
  }
  async editGuild(id, data: any) {
    const updateGuild = await db.guild.update({
      where: {
        id,
      },
      data,
    });

    return updateGuild;

    // let getGuld = database.read();
    // if (!getGuld[data.id]) return false;

    // getGuld[data.id] = {
    //   ...getGuld[data.id],
    //   ...data,
    // };

    // database.write(getGuld);
    // return getGuld[data.id];
  }
  async deleteGuild(id: string) {
    const deleteUpdate = await db.guild.delete({
      where: { id },
    });

    return deleteUpdate

    // const guild = database.find((guild) => guild.id == id);
    // const index = database.indexOf(guild)
    // if(guild.id == id) {
    //   return database.splice(index, 1)
    // }
  }
}
