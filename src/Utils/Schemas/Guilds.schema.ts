import joi from 'joi';

const guildId = joi.string();
const name = joi.string();
const avatar = joi.string().allow(null);
const members = joi.object({
  name: joi.string().required(),
  discordId: joi.string().required(),
  bot: joi.boolean().required(),
  avatar: joi.string().allow(null),
  banner: joi.string().allow(null),
});

export const createGuild = joi.object({
  name: name.required(),
  guildId: guildId.required(),
  avatar: avatar,
  members: joi.array().items(members).required(),
});

export const updateGuild = joi.object({
  name: name,
  guildId: guildId.required(),
  avatar: avatar,
});

export const addMember = joi.object({
  guildId: guildId.required(),
  member: members.required(),
});

export const removeMember = joi.object({
  guildId: guildId.required(),
  discordId: joi.string().required(),
});
