import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  todoForm: FormGroup;
  todos: Array<any>;
  hoveredId: number;
  constructor(
    private fb: FormBuilder
  ) {
    this.todos = [
      {id: 1, body: 'Item1'},
      {id: 2, body: 'Item2'},
      {id: 3, body: 'Item3'},
      ];
    this.todoForm = fb.group({
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createTodo() {
    const { body } = this.todoForm.value;
    this.todos.push({ id: this.todos.length + 1, body });
  }

  deleteTodo(id) {
    this.todos.splice(id, 1);
  }
}
