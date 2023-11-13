import * as fs from "fs";
import path from "path";

interface Iopts {
  folder?: string;
  filename: string;
  path: string;
}

export class JsonServices {
  folder: string | undefined;
  filename: string;
  path: string;

  constructor(otps: Iopts) {
    this.folder = otps.folder;
    this.path = otps.path;
    this.filename = otps.filename;

    this.initialize();
  }

  initialize() {
    if (!fs.existsSync(this.path)) {
      fs.mkdirSync(this.path, { recursive: true });
    }

    if (!fs.existsSync(this.getFilePath())) {
      fs.writeFileSync(this.getFilePath(), "{}");
    }
  }

  getFilePath() {
    return path.join(this.path, this.folder || "", this.filename);
  }

  read() {
    const filePath = this.getFilePath();
    const file = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(file);
  }

  write(data: any) {
    const filePath = this.getFilePath();
    const file = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, file);
    return true;
  }

  update(opts: { where: string; data: object }) {
    // json = {"user": []} or {user: { 12312312: [] } }
    // where = "user" or "users.123123"

    const filePath = this.getFilePath();
    const file = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(file);

    const whereArray = opts.where.split(".");
    const whereLength = whereArray.length;

    let current = json;
    for (let i = 0; i < whereLength; i++) {
      const key = whereArray[i];
      if (i === whereLength - 1) {
        current[key] = opts.data;
      } else {
        current = current[key];
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(current, null, 2))
    return true
  }

  push(opts: { where: string; data: object }) {
    // json = {"user": []} or {user: { 12312312: [] } }
    // where = "user" or "users.123123"

    const filePath = this.getFilePath();
    const file = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(file);

    const whereArray = opts.where.split(".");
    const whereLength = whereArray.length;

    let current = json;
    for (let i = 0; i < whereLength; i++) {
      const key = whereArray[i];
      if (i === whereLength - 1) {
        current[key].push(opts.data)
      } else {
        current = current[key];
      }
    }

    fs.writeFileSync(filePath, JSON.stringify(current, null, 2))
    return true
  }
}

// {where: "users.profiles.1234567890"}
// current = {users: { profile: { 1234567890: { name: 'dreikam' } } } }
// current[users] = { profile: { 1234567890: { name: 'dreikam' } } }
// current[users][profile] = { 1234567890: { name: 'dreikam' } }
// current[users][profile][1234567890] =  { name: 'dreikam' }
