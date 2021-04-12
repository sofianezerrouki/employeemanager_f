import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private baseUrl = "http://localhost:8080/api/employee/";

  constructor(private http:HttpClient) {}
 
  public getEmployees():Observable<Employee[]>{
  return this.http.get<Employee[]>(this.baseUrl);
  }
  public addEmployee(employee:Employee):Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl,employee);
  }
  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.http.put<Employee>(this.baseUrl,employee);
  }
  public deleteEmployee(employeeId:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"${employeeId}");
  }


}
