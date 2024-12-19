import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../../core/services/search.service';
import { ProfileService } from '../../../core/services/profile.service';
import { HostListener as AngularHostListener } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileComponent } from '../../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { MobileControlService } from '../../../core/services/mobile-control.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfileComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isMobile: boolean = false;
  isMobileView: boolean = window.innerWidth <= 950;

  constructor(
    public searchService: SearchService,
    public profileService: ProfileService,
    public authService: AuthService,
    public mobileService: MobileControlService
  ) {}

  @HostListener('window:resize', [])
  onResize() {
    this.isMobileView = window.innerWidth <= 950;
  }

  async ngOnInit() {
    this.isMobileView = window.innerWidth <= 950;
    if (localStorage.getItem('currentUserData') !== null) {
      await this.authService.loadCurrentUserDataFromLocalStorage();
    }
  }

  HostListener(eventName: string, args: any[]): MethodDecorator {
    return AngularHostListener(eventName, args);
  }
}
