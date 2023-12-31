import joi from 'joi';
import { membersCreate } from './Members.schema';
import { channelCreate } from './Channels.schema';

const guildId = joi.string();
const name = joi.string();
const avatar = joi.string().allow(null);

export const createGuild = joi.object({
  name: name.required(),
  guildId: guildId.required(),
  avatar: avatar,
  members: joi.array().items(membersCreate).required(),
  channels: joi.array().items(channelCreate).required(),
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

export const createChannel = joi.object({
  guildId: guildId.required(),
  channel: channelCreate.required(),
});

export const deleteChannel = joi.object({
  guildId: guildId.required(),
  channelId: joi.string().required(),
});
