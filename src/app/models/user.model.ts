export class User {
  email: string | null;
  userId: string;
  displayName: string;
  userStatus: boolean | string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  memberOfChannels?: string[];
  chatIds?: string[];

  constructor(
    email: string | null,
    userId: string,
    displayName: string,
    userStatus: boolean | string,
    createdAt: Date,
    avatarUrl: string,
    updatedAt?: Date,
    memberOfChannels?: string[],
    chatIds?: string[]
  ) {
    // Pflichtfelder
    this.email = email;
    this.userId = userId;
    this.displayName = displayName;
    this.userStatus = userStatus;
    this.createdAt = createdAt;
    this.avatarUrl = avatarUrl;

    // Optionale Felder
    this.updatedAt = updatedAt || new Date();
    this.memberOfChannels = memberOfChannels || [];
    this.chatIds = chatIds || [];
  }
}
