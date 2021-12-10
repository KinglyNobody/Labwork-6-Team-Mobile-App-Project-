import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.page.html',
  styleUrls: ['./to-do.page.scss'],
})
export class ToDoPage implements OnInit {
  addTaskForm = new FormControl();
  form: FormGroup;
  list = ['Clean House', '7.12.   Coffee', 'Read A Book'];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      task: ['', Validators.required],
    });
  }

  onSubmit() {
    let result = this.form.get('task').value;
    this.list.push(result);
  }

  onDelete(task) {
    let result = this.list.filter((x) => x !== task);
    this.list = result;
    console.log(this.list);
  }
}
