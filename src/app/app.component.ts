import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    public snackBar: MatSnackBar
  ) {}

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch(() => {
        this.snackBar.open('ログアウトに失敗しました', '閉じる', {
          duration: 2000,
        });
      });
  }
}
