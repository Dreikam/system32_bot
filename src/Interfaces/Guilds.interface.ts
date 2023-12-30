import { IMembers } from './Members.interace';

export interface IGuildCreate {
  guildId: string;
  name: string;
  avatar?: string;
  members: IMembers[];
}

export interface IGuildUpdate {
  guildId: string;
  name?: string;
  avatar?: string;
  member?: IMembers;
}
