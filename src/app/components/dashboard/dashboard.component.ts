import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ChatComponent } from './chat/chat.component';
import { ThreadBarComponent } from './thread-bar/thread-bar.component';
import { ChannelService } from '../../core/services/channel.service';
import { filter, first, Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { ProfileService } from '../../core/services/profile.service';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { ChatService } from '../../core/services/chat.service';
import { SearchService } from '../../core/services/search.service';
import { MobileControlService } from '../../core/services/mobile-control.service';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidenavComponent,
    ChatComponent,
    ThreadBarComponent,
    ThreadBarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('150ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('slideInOut2', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('150ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('150ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
private destroy$ = new Subject<void>();

  private closeThreadBarSubscription: Subscription = new Subscription();

  selectedChannel: { name: string } | null = null;
  isHovered = false;

  isMobileView = window.innerWidth <= 768;
  // channels$: Observable<{ channelId: string; name: string }[]>;
  currentThreadId: string | null = null;


  isThreadBarVisible: boolean = false;
  isSidebarVisible: boolean = true;

  constructor(
    private channelService: ChannelService,
    public profileService: ProfileService,
    public mobileService: MobileControlService,
    public chatService: ChatService,
    public searchService: SearchService,
    public authService: AuthService,
    public router: Router
  ) {
 
    // this.channels$ = this.channelService.channels$;

  }


async ngOnInit() {
  this.profileService.closePopup();
  this.checkMobileView();

  this.channelService.closeThreadBarEvent.pipe(
      takeUntil(this.destroy$)
  ).subscribe(() => {
      this.onCloseThreadBar();
  });

  // Wait for channel initialization and then set current channel
  this.channelService.channelsInitialized.pipe(
      filter(initialized => initialized),
      switchMap(() => this.channelService.channels$),
      filter(channels => channels.length > 0),
      first(),
      takeUntil(this.destroy$)
  ).subscribe(channels => {

      this.channelService.setCurrentChannel('Sce57acZnV7DDXMRasdf');
  });
}
  

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    // Emit and complete the subject
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Neu Mike
  closePopups() {
    this.chatService.emojiPickerChat = false;
    this.chatService.emojiPickerReactionChat = false;
    this.chatService.emojiPickerReactionThread = false;
    this.searchService.closeSearch();
    this.chatService.closePopups();
  }

  // HostListener, um auf Fenstergrößenänderungen zu reagieren
  @HostListener('window:resize', [])
  checkMobileView(): void {
    this.isMobileView = window.innerWidth <= 950;
  }

  toggleSidebar() {
    this.mobileService.toggleSidenav();
  }

  onHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  onChannelSelected(channel: any) {
    this.selectedChannel = channel;
  }

  onOpenThreadBar(): void {
    this.mobileService.openThread();
  }

  onCloseThreadBar(): void {
    this.mobileService.closeThread();
  }
}