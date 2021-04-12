import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeServiceService } from './employee-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';

  public employees:Employee[];

  constructor(private emplService:EmployeeServiceService){

  }
  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees():void{
     this.emplService.getEmployees().subscribe(
       (data:Employee[])=>{
          this.employees=data;
       },
       (error:HttpErrorResponse)=>{ 
          alert(error.message);
       }
     )
  }
  public OnOpenModal(employee:Employee,mode:string):void{
    
    const container = document.getElementById("main-container");

    const btn = document.createElement("button");
    btn.type="button";
    btn.style.display="none";
    if(mode==="add"){
      btn.setAttribute("data-toggle","#addEmployeeModal"); 
    }
    if(mode==="update"){
      btn.setAttribute("data-toggle","#update EmployeeModal"); 
    }
    if(mode==="delete"){
      btn.setAttribute("data-toggle","#deleteEmployeeModal"); 
    }
    container.appendChild(btn);
    btn.click();
  }  
}
