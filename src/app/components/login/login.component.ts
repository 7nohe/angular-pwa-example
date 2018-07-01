import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from 'angularfire2/auth';
import {MatSnackBar} from '@angular/material';

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
    public snackBar: MatSnackBar
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
    this.hide = true;
  }

  ngOnInit() {
  }

  onClickSubmit() {
    const { email, password } = this.loginForm.value;
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('login success');
      })
      .catch(error => {
        this.snackBar.open('ログインに失敗しました', '閉じる', {
          duration: 2000,
        });
      });
  }

}
