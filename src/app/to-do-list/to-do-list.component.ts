import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  task: Task = { content: "", completed: false }

  tasks: Task[] = [
    {content: "Aufgabe1", completed: false},
    {content: "Aufgabe2", completed: true},
    {content: "Aufgabe3", completed: false}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  addTask(){
    this.tasks.push(this.task)
    console.log(this.tasks)
  }

  removeTask(id: number){
    console.log(id)
    this.tasks = this.tasks.filter((task, index) => index !== id )
  }

  completeTask(id: number){
    console.log(id)
    const task = (task: any, index: any) => index !== id
    this.tasks.map((task, index) => task.completed = !task.completed)
  }


}