import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InfoFlyerService {
  info: string[] = [];

  constructor() {
    this.startInterval();
  }

  startInterval() {
    setInterval(() => {
      this.info.splice(0, 1);
    }, 5000);
  }
}
