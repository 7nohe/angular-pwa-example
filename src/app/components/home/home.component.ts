import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todoForm: FormGroup;
  todosRef: AngularFireList<any>;
  todos: Observable<any[]>;
  hoveredId: number;
  constructor(
    private fb: FormBuilder,
    db: AngularFireDatabase
  ) {
    this.todosRef = db.list('todos');
    this.todos = this.todosRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.todoForm = fb.group({
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createTodo() {
    const { body } = this.todoForm.value;
    this.todosRef.push({ body })
      .then(() => {
        this.todoForm.reset();
      });
  }

  deleteTodo(key: string) {
    this.todosRef.remove(key);
  }
}
