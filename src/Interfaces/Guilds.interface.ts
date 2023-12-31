import { IMembers } from './Members.interace';
import { IChannels, IChannelsUpdate } from './Channels.interface';

export interface IGuildCreate {
  guildId: string;
  name: string;
  avatar?: string;
  members: IMembers[];
  channels: IChannels[];
}

export interface IGuildUpdate {
  guildId: string;
  name?: string;
  avatar?: string;
  member?: IMembers;
  channel?: IChannelsUpdate;
}
