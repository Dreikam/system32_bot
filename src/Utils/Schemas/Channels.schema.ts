import joi from 'joi';

const name = joi.string();
const channelId = joi.string();
const type = joi.number();

export const channelCreate = joi.object({
  name: name.required(),
  channelId: channelId.required(),
  type: type.required(),
});

export const channelUpdate = joi.object({
  name: name,
  channelId: channelId,
  type: type,
});
