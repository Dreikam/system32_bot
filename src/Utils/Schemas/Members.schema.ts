import joi from 'joi';

const name = joi.string();
const discordId = joi.string();
const bot = joi.boolean();
const avatar = joi.string().allow(null);
const banner = joi.string().allow(null);

export const membersCreate = joi.object({
  name: name.required(),
  discordId: discordId.required(),
  bot: bot.required(),
  avatar: avatar,
  banner: banner,
});

export const memberUpdate = joi.object({
  name: name,
  discordId: discordId.required(),
  bot: bot,
  avatar: avatar,
  banner: banner,
});
