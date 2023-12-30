import joi from 'joi';
import { membersCreate } from './Members.schema';

const guildId = joi.string();
const name = joi.string();
const avatar = joi.string().allow(null);

export const createGuild = joi.object({
  name: name.required(),
  guildId: guildId.required(),
  avatar: avatar,
  members: joi.array().items(membersCreate).required(),
});

export const updateGuild = joi.object({
  name: name,
  guildId: guildId.required(),
  avatar: avatar,
});

export const addMember = joi.object({
  guildId: guildId.required(),
  member: membersCreate.required(),
});

export const removeMember = joi.object({
  guildId: guildId.required(),
  discordId: joi.string().required(),
});
