import joi from 'joi';

const id = joi.string().uuid({ version: 'uuidv4' });
const guildId = joi.string();
const name = joi.string();
const avatar = joi.string().allow(null);
const members = joi.object({
  name: joi.string().required(),
  discordId: joi.string().required(),
  bot: joi.boolean(),
  avatar: joi.string().allow(null),
});

export const createGuild = joi.object({
  name: name.required(),
  guildId: guildId.required(),
  avatar: avatar,
  members: joi.array().items(members).required(),
});

export const updateGuild = joi.object({
  id: id.required(),
  name: name,
  guildId: guildId,
  avatar: avatar,
  members: joi.array().items(members),
});

export const addMember = joi.object({
  guildId: guildId.required(),
  member: members.required(),
});
