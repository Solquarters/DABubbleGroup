import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../../models/channel.model.class';
import { Message } from '../../models/interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  channels$ = this.channelsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadChannels(); // Lädt Kanäle aus Firestore beim Start
  }

  // Lädt die bestehenden Kanäle aus Firestore
  private async loadChannels() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'channels'));
      const channels: Channel[] = querySnapshot.docs.map(doc =>
        Channel.fromFirestoreData(doc.data(), doc.id) // Nutze `fromFirestoreData`
      );
      this.channelsSubject.next(channels); // Setzt die initiale Kanalliste
    } catch (error) {
      console.error('Fehler beim Laden der Kanäle:', error);
    }
  }

  // Erstellt einen neuen Kanal
  async createChannel(name: string, description: string): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.firestore, 'channels'), {
        name: name,
        description: description,
        createdBy: 'currentUser', // Beispiel: Ersetze dies mit tatsächlichem Benutzer
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const newChannel: Channel = new Channel(
        docRef.id, // Firestore generiert die ID
        name,
        'currentUser', // Beispiel: Ersetze dies mit tatsächlichem Benutzer
        new Date(),
        new Date(),
        description
      );

      this.channelsSubject.next([...this.channelsSubject.value, newChannel]);
      console.log(`Channel created with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Fehler beim Erstellen des Kanals: ', error);
      throw error;
    }
  }








  messages: Message[] = [
    {
      messageId: 'message1',
      channelId: 'channel01',
      senderId: 'user123',
      senderName: 'Bob Johnson',
      senderAvatarUrl: '../../../../assets/basic-avatars/avatar1.svg',
      content: 'Hello everyone!',
      timestamp: new Date('2024-11-02T09:02:00Z'),
      attachments: [
        {
          type: 'image',
          url: 'https://example.com/image.png',
        },
      ],
      reactions: [
        {
          emoji: '👍',
          userIds: ['user456', 'user12367'],
        },
      ],
    },
    {
      messageId: 'message2',
      channelId: 'channel01',
      senderId: 'user456',
      senderName: 'Alice Wonderland',
      senderAvatarUrl: '../../../../assets/basic-avatars/avatar2.svg',
      content: 'Hey there! Whats up how is it going, the weather is so nice',
      timestamp: new Date('2024-11-13T15:10:00Z'),

      ///Thread messages counter here? Whenever a message in thread is added, this counter should be incremented
      ///or: by fetching the thread, you get the thread length. But then to get the "2 Antworten" below a message, 
      ///you will need to fetch the thread data even if its not displayed yet...
      threadMessageCount: 3,
      threadId: 'thread26',
      lastThreadMessage: new Date('2024-11-18T02:11:00Z'),
      },
    {
      messageId: 'message3',
      channelId: 'channel01',
      senderId: 'user123',
      senderName: 'Michael Jordan',
      senderAvatarUrl: '../../../../assets/basic-avatars/avatar3.svg',
      content: 'I´m great, thanks! After five years on the east coast... it was time to go home',
      timestamp: new Date('2024-11-14T15:15:00Z'),
      threadId: 'thread2623623s6',
      threadMessageCount: 2,
      lastThreadMessage: new Date('2024-11-17T00:10:00Z'),
      reactions: [
        {
          emoji: '🚀',
          userIds: ['user456', 'user456115', 'user4568888'],
        },
        {
          emoji: '🌟',
          userIds: ['user12367'],
        },
      ],
    },
    {
      messageId: 'message34',
      channelId: 'channel01',
      senderId: 'user1234',
      senderName: 'Daniel Jackson',
      senderAvatarUrl: '../../../../assets/basic-avatars/avatar4.svg',
      content: 'How are you?',
      timestamp: new Date('2024-11-14T15:15:00Z'),
      
    },
    {
      messageId: 'message43',
      channelId: 'channel01',
      senderId: 'user1234',
      senderName: 'Daniel Jackson',
      senderAvatarUrl: '../../../../assets/basic-avatars/avatar4.svg',
      content: 'Given that your messages are updated frequently and data changes are dynamic, using pipes is the easiest and most straightforward approach for your situation.',
      timestamp: new Date('2024-11-16T15:15:00Z'),
     
    },

    // ...additional messages
  ];




  
}