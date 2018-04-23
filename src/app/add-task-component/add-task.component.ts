import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Component} from "@angular/core";
import {todoservice} from "../todo-service/todoservice";
import { Router } from "@angular/router";

@Component({
    selector: 'add-task',
    templateUrl: 'add-task.component.html',
    providers:[todoservice]
})
export class AddTaskComponent {

    todoForm:FormGroup;
    postTask:any;
    taskName:string = '';

    constructor(private service:todoservice,private todoBuilder:FormBuilder,private router:Router) {

    this.todoForm = todoBuilder.group({
         'taskName' : [null, Validators.required]
      });
    }

  addTask(postTask) {  
    this.taskName = postTask.taskName;
    let todo = {name:this.taskName,status:'P'};
    this.service.createService('http://localhost:8585/todo',todo);    
    this.router.navigate(['']);
      
  }   
}
 
 