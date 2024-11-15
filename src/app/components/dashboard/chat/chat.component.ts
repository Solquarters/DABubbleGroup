///INTERFACES
////////////////////////////////////////////
export interface Channel {
  channelId: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  memberIds: string[];
}
export interface User {
  userId: string;
  displayName: string;
  avatarUrl: string;
  joinedAt: Date;
  role: string;
}

export interface Message {
  messageId: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  thread?: Thread;
  attachments?: Attachment[];
  reactions?: Reaction[];
}
export interface Thread {
  threadId: string;
  messages: Message[];
}

export interface Attachment {
  type: string;
  url: string;
}

export interface Reaction {
  reactionId: string;
  emoji: string;
  userIds: string[];
}

///INTERFACES END
////////////////////////////////////////////


import { Component } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', '../../../../styles.scss']
})


export class ChatComponent {
  @Input() currentChannel: { name: string } | null = null;
}
  
/** 
  channels: Channel[] = [
    {
      channelId: 'channel01',
      name: 'Entwicklerteam',
      description: 'Main channel for general discussion',
      createdBy: 'adminUserId',
      createdAt: new Date('2024-01-01T12:00:00Z'),
      updatedAt: new Date('2024-11-13T12:00:00Z'),
      memberIds: ['user123', 'user456', 'user45655'],
    },
    // ...additional channels
  ];

  currentChannel: Channel = this.channels[0];

  /////////////////USERS
  get channelMembers(): User[] {
    return this.users.filter(user => this.currentChannel.memberIds.includes(user.userId));
  }

  users: User[] = [
    {
      userId: 'user123',
      displayName: 'Alice',
      avatarUrl: '../../../../assets/basic-avatars/avatar-1.png',
      joinedAt: new Date('2024-01-05T15:30:00Z'),
      role: 'member',
    },
    {
      userId: 'user456',
      displayName: 'Bob',
      avatarUrl: '../../../../assets/basic-avatars/avatar2.png',
      joinedAt: new Date('2024-01-06T10:00:00Z'),
      role: 'moderator',
    },
    {
      userId: "user45655",
      displayName: "Noah",
      avatarUrl: '../../../../assets/basic-avatars/avatar3.png',
      joinedAt: new Date('2024-01-06T10:00:00Z'),
      role: 'member',
    },
    {
      userId: "user45655",
      displayName: "Noah",
      avatarUrl: '../../../../assets/basic-avatars/avatar3.png',
      joinedAt: new Date('2024-01-06T10:00:00Z'),
      role: 'member',
    },
    {
      userId: "user45655",
      displayName: "Noah",
      avatarUrl: '../../../../assets/basic-avatars/avatar3.png',
      joinedAt: new Date('2024-01-06T10:00:00Z'),
      role: 'member',
    }
  ];


  messages: Message[] = [
    {
      messageId: 'message1',
      channelId: 'channel01',
      senderId: 'user123',
      content: 'Hello everyone!',
      timestamp: new Date('2024-11-13T15:00:00Z'),
      thread: {
        threadId: 'thread1',
        messages: [
          {
            messageId: 'message2',
            channelId: 'channel01',
            senderId: 'user456',
            content: 'Hey there!',
            timestamp: new Date('2024-11-13T15:10:00Z'),
          },
          {
            messageId: 'message3',
            channelId: 'channel01',
            senderId: 'user123',
            content: 'How are you?',
            timestamp: new Date('2024-11-13T15:15:00Z'),
          },
        ],
      },
      attachments: [
        {
          type: 'image',
          url: 'https://example.com/image.png',
        },
      ],
      reactions: [
        {
          reactionId: 'reaction1',
          emoji: '👍',
          userIds: ['user456'],
        },
      ],
    },
    // ...additional messages
  ];


}
*/