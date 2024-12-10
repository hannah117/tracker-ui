import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";
import {MatInputModule} from '@angular/material/input';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { EntryComponent } from './entry/entry.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, EntryComponent , CommonModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tracker-ui';
}
