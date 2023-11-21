import { db } from '@Services/db';
import fs from 'fs';

const createData = async () => {
  let guild = {
    guildId: '123',
    name: 'Example Guild',
    avatar: 'https://example.com/avatar.jpg',
    memberCount: 100,
  };
  let member = {
    name: 'Kamerr Ezz',
    discordId: '403695999941345280',
  };

  const guldCreate = await db.guilds.create({ data: guild });
  const memberCreate = await db.members.create({
    data: {
      ...member,
    },
  });

  let jsonSave = {
    guldCreate,
    memberCreate,
  };

  fs.writeFileSync('./test.json', JSON.stringify(jsonSave, null, 2));
  return jsonSave;
};

createData().then((item) => console.log(item));
