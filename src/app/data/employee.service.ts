import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmployeeRaw } from './employeeRaw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

    getEmployees(): Observable<Employee[]>{
      return this.http.get<Employee[]>('https://serene-mesa-90721.herokuapp.com/employees')
    }

    saveEmployee(employee:EmployeeRaw): Observable<any>{
      return this.http.put<any>("https://serene-mesa-90721.herokuapp.com/employee/" + employee._id, employee);
    }

    getEmployee(id): Observable<EmployeeRaw[]>{
      return this.http.get<EmployeeRaw[]>("https://serene-mesa-90721.herokuapp.com/employee-raw/" + id);
    }
}
