import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm: FormGroup;
  loading = false;
  error:string|undefined;
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControls() { return this.loginForm.controls; }


  ngOnInit(): void {
    //this.auth.printId('Hi this is from the LoginComponent');
  }

  onLogin() {
    this.loginForm.get('userName')?.setValue('admin@acube.com');
    this.loginForm.get('password')?.setValue('Admin@acube123');

    this.error = undefined;
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Enter username and password';
      return;
    }
    this.loading = true;
    this.auth.login(this.loginForm.value).subscribe({
      //complete:()=>{console.log(`Login call completed`)},
      error: (err) => {
        this.error = err.error.message ? err.error.message : err.message;
        console.log(this.error);
        this.loading = false;
      }
    });
  }

}
