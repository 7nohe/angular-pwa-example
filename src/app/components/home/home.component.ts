import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {finalize, map} from 'rxjs/operators';

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
  loading: Boolean;
  constructor(
    private fb: FormBuilder,
    db: AngularFireDatabase
  ) {
    this.loading = true;
    this.todosRef = db.list('todos');
    this.todos = this.todosRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ),
    );

    this.todos.subscribe(() => this.loading = false);
    this.todoForm = fb.group({
      body: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createTodo() {
    const { body, dueDate } = this.todoForm.value;
    this.todosRef.push({ body, dueDate: dueDate.getTime() })
      .then(() => {
        this.todoForm.reset();
      });
  }

  deleteTodo(key: string) {
    this.todosRef.remove(key);
  }
}
