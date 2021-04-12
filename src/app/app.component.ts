import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.emplService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
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
  public onOpenModal(employee:Employee,mode:string):void{
    console.log('onOpenModal() clicked!');
    const container = document.getElementById("main-container");

    const button = document.createElement("button");
    button.type="button";
    button.style.display="none";
    if(mode === "add"){
      button.setAttribute("data-target","#addEmployeeModal"); 
    }
    if(mode==="update"){
      button.setAttribute("data-target","#updateEmployeeModal"); 
    }
    if(mode==="delete"){
      button.setAttribute("data-target","#deleteEmployeeModal"); 
    }
    container.appendChild(button);
    button.click(); 
  }  
   onDeleteEmployee(){  

  }
}


