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
    {content: "Einkaufen", completed: false},
    {content: "Putzen", completed: false},
    {content: "Pflanzen gießen", completed: false}
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
    this.tasks.map((task, index) => {
      if ( index == id ){
        task.completed = !task.completed
        console.log(task.completed)
      }
    })
  }


}