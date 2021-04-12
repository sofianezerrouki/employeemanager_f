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
  public editEmployee: Employee;
  public deleteEmployee: Employee;

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
 
   onDeleteEmployee(){  

  }
  public onOpenModal(employee: Employee, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#editEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }
}


