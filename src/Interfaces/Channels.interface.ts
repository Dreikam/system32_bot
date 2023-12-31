export interface IChannels {
  name: string;
  channelId: string;
  type: number;
}

export interface IChannelsUpdate {
  name?: string;
  channelId?: string;
  type?: number;
}
