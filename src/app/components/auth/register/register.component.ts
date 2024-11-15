import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleService } from '../style.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(public styleService: StyleService) {}
}
