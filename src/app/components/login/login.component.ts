import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;

  constructor(
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
    this.hide = true;
  }

  ngOnInit() {}

  onClickSubmit() {
    const { email, password } = this.loginForm.value;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['']);
      })
      .catch(error => {
        this.snackBar.open('Login failed', 'Close', {
          duration: 2000,
        });
      });
  }

}
