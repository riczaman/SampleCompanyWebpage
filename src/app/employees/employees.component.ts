import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeesSub: any;
  loadingError: boolean=false; //had to do boolean = false because this.loadingError would not accept true otherwise
  filteredEmployees: Employee[];

  constructor(private eService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.getEmployeesSub=this.eService.getEmployees().subscribe(employees =>{
      this.employees=employees;
      this.filteredEmployees=employees;
    }, err=>this.loadingError=true);
  }
  
  routeEmployee(id: String){
    this.router.navigate(['/employee', id]);
  }

  ngOnDestroy(){
    if(this.getEmployeesSub){ //Checks that getEmployeesSub is not undefined before unsubscribing 
      this.getEmployeesSub.unsubscribe();
    }
  }

  onEmployeeSearchKeyUP(event:any) {
    this.filteredEmployees = this.employees.filter((employee) => {
      return employee.FirstName.toLowerCase().includes(event.target.value) ||
        employee.LastName.toLowerCase().includes(event.target.value) ||
        employee.Position.PositionName.toLowerCase().includes(event.target.value);
    });
  }
}
