import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DummyDataService } from '../../../../../core/services/dummy-data.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-testing-functions-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule ],
  templateUrl: './testing-functions-dialog.component.html',
  styleUrl: './testing-functions-dialog.component.scss'
})
export class TestingFunctionsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TestingFunctionsDialogComponent>,
    private dummyDataService: DummyDataService
  ) {}

  populateDummyChannels() {
    this.dummyDataService.addDummyChannels();
  }

  resetPublicUserData() {
    this.dummyDataService.resetPublicUserData();
  }

  populateDummyChannelsWithDummyMembers() {
    this.dummyDataService.populateChannelsWithMembers();
  }

  createMessagesCollection() {
    this.dummyDataService.createMessagesCollection();
  }

  createThreadMessages() {
    this.dummyDataService.createThreadMessages();
  }
}
