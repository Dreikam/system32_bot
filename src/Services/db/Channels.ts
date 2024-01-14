import { db as prisma } from '@Services/db';
import { IChannels, IChannelsUpdate } from '@Interfaces/Channels.interface';

export class ChannelsServices {
  getGuildChannels(guildId: string) {
    return prisma.guilds.findFirst({
      where: {
        guildId: {
          equals: guildId,
        },
      },
      include: {
        channels: true,
      },
    });
  }

  getChannelById(channelId: string) {
    return prisma.guildChannels.findFirst({
      where: {
        channelId: {
          equals: channelId,
        },
      },
    });
  }

  createChannel(guildId: string, data: IChannels) {
    const { name, channelId, type } = data;
    return prisma.guilds.update({
      where: {
        guildId,
      },
      data: {
        channels: {
          create: {
            name,
            channelId,
            type,
          },
        },
      },
    });
  }

  updateChannel(data: IChannelsUpdate) {
    const { channelId, name, type } = data;

    return prisma.guildChannels.update({
      where: {
        channelId,
      },
      data: {
        name,
        channelId,
        type,
      },
    });
  }

  deleteChannel(channelId: string) {
    return prisma.guildChannels.delete({
      where: {
        channelId,
      },
    });
  }
}
