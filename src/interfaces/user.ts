export interface User {
    id: number;
    userName: string;
    points: number;
    lastMining?: Date;
    invitedFriends: string[];
    youTubeSubs: boolean;
    tikTokSubs: boolean;
    instagramSubs: boolean;
    [key: string]: boolean | number | string | Date | string[] | undefined;
  }