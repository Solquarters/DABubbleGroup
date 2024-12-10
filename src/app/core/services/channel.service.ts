import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  collectionData,
  writeBatch,
  serverTimestamp,arrayUnion, doc, 
  setDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { Channel } from '../../models/channel.model.class';
import { MemberService } from './member.service';
import { UserService } from './user.service';
import { Inject } from '@angular/core';
import { User } from '../../models/interfaces/user.interface';
import { of as observableOf } from 'rxjs';
import { tap as rxjsTap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelsSubject = new BehaviorSubject<Channel[]>([]); // BehaviorSubject für reaktive Kanäle
  channels$ = this.channelsSubject.asObservable(); // Observable für Komponenten


  ///Neu von Roman
  private currentChannelIdSubject = new BehaviorSubject<string | null>(null);
  currentChannelId$ = this.currentChannelIdSubject.asObservable();


  // Modify currentChannel$ to be derived from channels$ and currentChannelId$
  //Auf diese Weise reagiert der Chat Header auf Änderungen im currentChannel.[memberIds] array dynamisch
  currentChannel$ = combineLatest([this.channels$, this.currentChannelId$]).pipe(
  map(([channels, currentChannelId]) => {
    if (currentChannelId) {
      return channels.find(c => c.channelId === currentChannelId) || null;
    } else {
      return null;
    }
  }),
  shareReplay(1) // Optional: ensures subscribers get the latest value immediately
  );



  updateCurrentChannelMembers(memberIds: string[]): Observable<User[]> {
    return this.userService.publicUsers$.pipe(
      map((users: User[] | null) => users ? users.filter((user) => memberIds.includes(user.publicUserId)) : []),
      tap((filteredUsers: User[]) => {
        console.log('Filtered members:', filteredUsers);
      })
    );
  }


  onMembersUpdated(updatedMemberIds: string[]): void {
    if (!this.currentChannelIdSubject.getValue()) {
      console.error('No current channel selected.');
      return;
    }
  
    // Merge the new members with existing ones
    this.currentChannel$.pipe(
      map(currentChannel => {
        if (currentChannel) {
          const updatedMembers = [...new Set([...(currentChannel.memberIds || []), ...updatedMemberIds])];
          
          // Update the current channel's member IDs
          currentChannel.memberIds = updatedMembers;
          
          // Use the service to get the updated member details
          this.updateCurrentChannelMembers(updatedMembers).subscribe(
            (updatedUsers) => {
              console.log('Updated user data:', updatedUsers);
              
              // Update the observable for channelMembers$
              this.channelMembers$ = this.updateCurrentChannelMembers(updatedMembers).pipe(shareReplay(1));
            },
            (error) => {
              console.error('Failed to update user data for members:', error);
            }
          );
        }
      })
    ).subscribe();
  }
  

  ////for offline rendering...
  channels: any;

  private users: User[] = []; // Define the users property
  channelMembers$ = new BehaviorSubject<User[]>([]).asObservable(); // Add channelMembers$ property

  constructor(private firestore: Firestore, private memberService: MemberService, @Inject(UserService) private userService: UserService) {
    this.loadChannels(); // Lädt Kanäle aus Firestore beim Start

    

    ////for offline rendering...
  this.channels= [
    {
      channelId: 'channel01',
      name: 'Entwicklerteam',
      description: 'Main channel for general discussion',
      createdBy: 'adminUserId',
      createdAt: new Date('2024-01-01T12:00:00Z'),
      updatedAt: new Date('2024-11-13T12:00:00Z'),
      memberIds: ['user123', 'user456', 'user45655', 'user1234'],
    },
  ];

  }

  private loadChannels() {
    const channelsCollection = collection(this.firestore, 'channels');
    const channelsObservable = collectionData(channelsCollection, { idField: 'channelId' }) as Observable<Channel[]>;
  
    channelsObservable
      .pipe(
        // Sortiere die Kanäle nach einem Kriterium (z. B. createdAt)
        map((channels) =>
          channels.sort((a, b) => {
            // Sicherstellen, dass createdAt existiert und sortieren
            const createdAtA = (a as any)?.createdAt || 0;
            const createdAtB = (b as any)?.createdAt || 0;
            return createdAtA > createdAtB ? 1 : -1;
          })
        )
      )
      .subscribe({
        next: (sortedChannels) => {
          this.channelsSubject.next(sortedChannels);
        },
        error: (error) => {
          console.error('Error fetching channels:', error);
        },
      });
  }
  

 
  async createChannel(name: string, description: string): Promise<string> {
    try {
      const now = new Date();
      const createdBy = 'currentUser'; // Replace with actual user ID if available
      const newChannelData = {
        name,
        description,
        createdBy,
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
        memberIds: [], // Initialize empty member IDs array
      };
  
      // Create the document in Firestore
      const channelsCollection = collection(this.firestore, 'channels');
      const docRef = await addDoc(channelsCollection, newChannelData);
  
      // Update the document with the generated Firestore ID
      await updateDoc(docRef, {
        channelId: docRef.id,
      });
  
      // Create a local Channel object
      const newChannel = new Channel(docRef.id, name, createdBy, now, now, description, []);
  
      // Sort channels by `createdAt` after adding the new one
      const updatedChannels = [...this.channelsSubject.value, newChannel].sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
  
      // Update the local channel list
      this.channelsSubject.next(updatedChannels);
  
      console.log(`Channel created with ID: ${docRef.id}`);
  
      // Set the new channel as the current active channel
      this.setCurrentChannel(docRef.id);
  
      return docRef.id;
    } catch (error) {
      console.error('Error creating channel:', error);
      throw error;
    }
  }
  

  /**
   * Fügt Mitglieder zu einem Kanal hinzu
   * @param channelId Die ID des Kanals
   * @param memberIds Eine Liste von Mitglieds-IDs
   */
  async addMembersToChannel(channelId: string, memberIds: string[]): Promise<void> {
    console.log('Adding members to channel:', { channelId, memberIds }); // Debug log
    try {
      if (!channelId || memberIds.length === 0) {
        console.error('Invalid channelId or memberIds:', { channelId, memberIds }); // Debug log
        throw new Error('Ungültige Eingaben für Mitglieder oder Kanal-ID.');
      }
  
      const channelRef = doc(this.firestore, 'channels', channelId);
  
      await updateDoc(channelRef, {
        memberIds: arrayUnion(...memberIds),
      });
  
      console.log(`Members successfully added to channel ${channelId}:`, memberIds);
    } catch (error) {
      console.error('Error while adding members:', error);
      throw error;
    }
  }
  

  async updateChannel(channelId: string, name: string, description: string): Promise<void> {
    try {
      const channelRef = doc(this.firestore, 'channels', channelId);
  
      await updateDoc(channelRef, {
        name,
        description,
        updatedAt: new Date(),
      });
  
      console.log(`Channel ${channelId} updated successfully.`);
  
      // Lokale Daten aktualisieren
      const updatedChannels = this.channelsSubject.value.map((channel) =>
        channel.channelId === channelId ? { ...channel, name, description } : channel
      );
  
      this.channelsSubject.next(updatedChannels);
    } catch (error) {
      console.error('Error updating channel:', error);
      throw error;
    }
  }
  
  async removeMemberFromChannel(channelId: string, memberId: string): Promise<void> {
    try {
      const channelRef = doc(this.firestore, 'channels', channelId);
      await updateDoc(channelRef, {
        memberIds: arrayRemove(memberId), // Entfernt die ID aus dem Array
      });
      console.log(`Mitglied ${memberId} erfolgreich entfernt.`);
    } catch (error) {
      console.error('Fehler beim Entfernen des Mitglieds:', error);
    }
  }
  

  /**
   * Sets the current channel to display
   * @param channelId - ID of the channel to display
   */
  displayChannel(channelId: string): void {
    this.setCurrentChannel(channelId);
  }

  /**
   * Sets the current channel ID
   * @param channelId - ID of the channel
   */
  setCurrentChannel(channelId: string): void {
    this.currentChannelIdSubject.next(channelId);
    console.log(`Current channel set to: ${channelId}`);
  }


//////////////////Roman: Dummy Data für Channels in firebase
async addDummyChannels() {
  try {
    // Step 1: Delete all existing documents in the 'channels' collection
    const channelsCollection = collection(this.firestore, 'channels');
    const querySnapshot = await getDocs(channelsCollection);

    const batchSize = 500; // Firestore allows up to 500 operations per batch
    let batch = writeBatch(this.firestore);
    let operationCount = 0;

    for (const docSnapshot of querySnapshot.docs) {
      batch.delete(docSnapshot.ref);
      operationCount++;

      if (operationCount === batchSize) {
        await batch.commit();
        batch = writeBatch(this.firestore);
        operationCount = 0;
      }
    }

    // Commit any remaining operations
    if (operationCount > 0) {
      await batch.commit();
    }

    console.log('All existing channels have been deleted.');

    // Step 2: Add dummy channels
    const dummyChannels = [
      {
        channelId: "Sce57acZnV7DDXMRydN5",
        name: 'Service',
        description: 'Verbesserungsvorschläge',
        createdBy:"currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],

      },
      {
        channelId: "5KvjC3MbUiNYBrgI1xZn",
        name: 'Geschäftsführung',
        description: 'Discuss marketing strategies and campaigns',
        createdBy:"currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],
      },
      {
        channelId: "FJz45r1mh8K61V2EjIQ0",
        name: 'Vertriebs Team',
        description: 'Sales team discussions and updates',
        createdBy:"currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],
      },
      {
        channelId: "ODLmxfQZXd4gexfQ9WBx",
        name: 'Marketing Team',
        description: 'Customer support and issue tracking',
        createdBy:"currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],
      },
      {
        
        channelId: "2MScvzChDXWchtuFsJW9",
        name: 'Team Entwicklung',
        description: 'Human resources discussions',
        createdBy:"currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],
      },
      // Add more channels as needed
    ];

    for (const channelData of dummyChannels) {
      // try {
      //   await this.createChannel(channelData.name, channelData.description);
      //   // console.log(`Dummy channel "${channelData.name}" added.`);
      // } catch (error) {
      //   // console.error(`Error adding dummy channel "${channelData.name}":`, error);
      // }
      const userDocRef = doc(channelsCollection, channelData.channelId); // Use setDoc with specific ID

      await setDoc(userDocRef, {

       channelId: channelData.channelId,
        name: channelData.name,
        description: channelData.description,
        createdBy: "currentUser",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        memberIds:[],
      });

    }

    console.log('Dummy channels have been added.');
  } catch (error) {
    console.error('Error in addDummyChannels:', error);
  }
}


async populateChannelsWithMembers() {
  try {
    // Fetch all public user data
    const publicUserDataCollection = collection(this.firestore, 'publicUserDataClone');
    const publicUsersSnapshot = await getDocs(publicUserDataCollection);

    // Extract publicUserIds from the fetched data
    const publicUserIds = publicUsersSnapshot.docs.map((doc) => doc.id);

    if (publicUserIds.length === 0) {
      console.warn('No public users found in publicUserData collection.');
      return;
    }

    // Fetch all channels
    const channelsCollection = collection(this.firestore, 'channels');
    const channelsSnapshot = await getDocs(channelsCollection);

    const batchSize = 500; // Firestore batch limit
    let batch = writeBatch(this.firestore);
    let operationCount = 0;

    for (const channelDoc of channelsSnapshot.docs) {
      // Randomly select a number of members (0 to 9)
      const numMembers = Math.floor(Math.random() * 7);

      // Shuffle publicUserIds and select `numMembers` random IDs
      const shuffledUserIds = this.shuffleArray([...publicUserIds]); // Copy array to avoid mutating the original
      const selectedMemberIds = shuffledUserIds.slice(0, numMembers);

      // Update the channel's memberIds array
      const channelRef = channelDoc.ref;
      batch.update(channelRef, { memberIds: selectedMemberIds });
      operationCount++;

      // Commit the batch if it reaches the batch size limit
      if (operationCount === batchSize) {
        await batch.commit();
        batch = writeBatch(this.firestore);
        operationCount = 0;
      }
    }

    // Commit any remaining operations
    if (operationCount > 0) {
      await batch.commit();
    }

    console.log('Channels have been populated with random public users.');
  } catch (error) {
    console.error('Error populating channels with members:', error);
  }
}
/**
 * Helper function to shuffle an array
 */
private shuffleArray(array: any[]): any[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

async resetPublicUserData() {
  try {
    const publicUserDataCollection = collection(this.firestore, 'publicUserDataClone');

    // Step 1: Delete all existing documents in the collection
    const querySnapshot = await getDocs(publicUserDataCollection);

    for (const doc of querySnapshot.docs) {
      await deleteDoc(doc.ref);
      console.log(`Deleted document with ID: ${doc.id}`);
    }
    console.log('All existing documents in publicUserDataClone collection have been deleted.');

    // Step 2: Add users from the `users` array with their `publicUserId` as the document ID
    for (const user of this.users) {
      const userDocRef = doc(publicUserDataCollection, user.publicUserId); // Use setDoc with specific ID

      await setDoc(userDocRef, {
        displayName: user.displayName,
        email: user.email,
        avatarUrl: user.avatarUrl,
        userStatus: user.userStatus,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        publicUserId: user.publicUserId,
      });

    

      console.log(`User ${user.displayName} added with ID: ${user.publicUserId}`);
    }

    console.log('All users have been repopulated in the publicUserDataClone collection with correct document IDs.');
  } catch (error) {
    console.error('Error resetting publicUserDataClone:', error);
  }
}
}

function arrayRemove(memberId: string): any {
  return (array: string[]) => array.filter(id => id !== memberId);
}
 
function of(arg0: never[]): Observable<User[]> {
  return observableOf(arg0);
}
function tap(arg0: (filteredUsers: User[]) => void) {
  return rxjsTap(arg0);
}



