import 'dotenv/config';
import { Strategy } from 'passport-discord';
import { MembersServices } from '@Services/db/Members';
const memberservices = new MembersServices();

// https://discord.com/developers/docs/topics/oauth2

export const discord = new Strategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `${process.env.PROJECT_URL}/auth/discord/callback`,
    scope: ['identify', 'guilds'],
  },
  async (accessToken, refreshToken, profile, done) => {
    let getUser = await memberservices.getMemberById(profile.id);
    let user = {
      discordId: profile.id,
      name: profile.username,
      avatar: profile.avatar,
      guilds: profile.guilds,
    };

    if (getUser) {
      return done(null, user);
    } else {
      await memberservices.createMember({
        discordId: profile.id,
        name: profile.username,
        avatar: profile.avatar,
        banner: profile.banner,
        bot: false,
      });

      return done(null, user);
    }
  }
);
