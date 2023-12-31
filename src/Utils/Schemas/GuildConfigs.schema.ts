import joi from 'joi';

const logsChannel = joi.string();
const modRoles = joi.string();
const ticketChannel = joi.string();
const ticketSection = joi.string();
const announcementsChannel = joi.string();
const welcomeChannel = joi.string();

export const guildConfig = joi.object({
  logsChannel: logsChannel,
  modRoles: modRoles,
  ticketChannel: ticketChannel,
  ticketSection: ticketSection,
  announcementsChannel: announcementsChannel,
  welcomeChannel: welcomeChannel,
});

export const configId = joi.string().guid({ version: 'uuidv4' });
