import { inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, onSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CloudService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  unsubChannels;
  unsubMembers;
  unsubIds;
  channels: any = [];
  members: any = [];
  ids: any = [];

  constructor() {
    this.unsubChannels = this.subList('channels');
    this.unsubMembers = this.subList("members");
    this.unsubIds = this.subList("userId_memberid");
  }

  ngOnDestroy(): void {
    this.unsubChannels();
    this.unsubMembers();
    this.unsubIds();
  }

  subList(ref: string) {
    return onSnapshot(this.getRef(ref), (querySnapshot) => {
      if (ref === 'channels') {
        this.channels = querySnapshot.docs.map((doc) => doc.data());
      } else if (ref === 'members') {
        this.members = querySnapshot.docs.map((doc) => doc.data());
      } else if (ref === 'userId_memberid') {
        this.ids = querySnapshot.docs.map((doc) => doc.data());
      }
    });
  }

  getRef(ref: string) {
    return collection(this.firestore, ref);
  }

  getSingleRef(ref: string, docId: string) {
    return doc(collection(this.firestore, ref), docId);
  }
}
