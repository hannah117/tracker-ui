import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../models/user.model';
import { Habit } from '../models/habit';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-habit',
  imports: [MatFormField, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './habit.component.html',
  styleUrl: './habit.component.scss'
})
export class HabitComponent {

  formGroup: FormGroup;
  useremail: String;
  password: String;
  habits: Habit[];
  private habitSubscription: Subscription;

  


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private authService: AuthService) {   }

  log(value: any) {
    console.log(value)
  }


  ngOnInit() {
    this.createForm();
    this.getUserIdInitial();
    // this.getUserHabits(this.getUserId()).subscribe(data => {
    //   console.log(data)
    //   this.habits = data as Habit[]
    // })

  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, Validators.required],
      'description': [null, Validators.required],
      'userId': [null, Validators.required],
      'unit': [null, Validators.required],
      'frequency': [null, Validators.required],
      'timeframe': [null, Validators.required]
    });
  }

  getWindow() {
    return (typeof window !== "undefined" ? window : ({} as Window))
  }


  getEmail() {
    if (typeof window !== "undefined") {
     return this.getWindow().localStorage.getItem("email")
    }
    return ""
  }

  getToken() {
    if (typeof window !== "undefined") {
     return this.getWindow().localStorage.getItem("token")
    }
    return ""
  }

  setUserId(userId: string) {
    if (typeof window !== "undefined") {
     this.getWindow().localStorage.setItem("userId", userId)
     }
  }

  getUserId() {
    if (typeof window !== "undefined") {
     return this.getWindow().localStorage.getItem("userId")
     }
     else return ""
  }

  
  getUserIdInitial() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.getToken(),
      "Access-Control-Allow-Origin": "*"
    });
    this.http.get('http://localhost:8081/habit-tracker/user/user/email/' + this.getEmail(), {headers})
    .subscribe(data => {
      return this.setUserId((data as User).id.toString())
    }) 
  
  }

  onSubmit() {    

    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.getToken(),
      "Access-Control-Allow-Origin": "*"
    });

    this.formGroup.patchValue({userId: this.getWindow().localStorage.getItem("userId")})

    console.log(this.formGroup.value)
    this.http.post('http://localhost:8081/habit-tracker/habit', this.formGroup.value, {headers})
    .subscribe(data => {
      console.log(data)

    })
    
    console.log(this.authService.token)
    this.formGroup.reset(); 
  }

  getUserHabits(userId: string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.getToken(),
      "Access-Control-Allow-Origin": "*"
    });

    return this.http.get('http://localhost:8081/habit-tracker/habit/habits/'+ userId, {headers})
  }

  ngOnDestroy() {
    this.habitSubscription.unsubscribe(); // Prevent memory leaks
  }
}
