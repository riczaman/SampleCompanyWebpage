import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employeeRaw';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../data/employee.service';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubscription: any;
  employeeSubscription: any;
  getPositionSubscription: any;
  saveEmployeeSubscription: any;
  employee: EmployeeRaw = new EmployeeRaw;
  positions: Position[];
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private employeeServ: EmployeeService, private aRoute:ActivatedRoute, private positionServ: PositionService) { }

  ngOnInit() {
    this.paramSubscription=this.aRoute.params.subscribe(params=>{
      this.employeeSubscription = this.employeeServ.getEmployee(params['_id']).subscribe((employ)=>{
        this.employee=employ[0];
        this.getPositionSubscription=this.positionServ.getPositions().subscribe(pdata=>{
          this.positions = pdata; 
        })
      })
    })
  }

  onSubmit(f: NgForm):void{
    this.employeeSubscription=this.employeeServ.saveEmployee(this.employee).subscribe(employ=>{
      this.successMessage=true;

      setTimeout(()=>{
        this.successMessage=false
      },2500);
    }, error =>{
        this.failMessage=true;
        setTimeout(()=>{
          this.failMessage=false
        }, 2500);
    })
  }

  ngOnDestry() {
    if (this.saveEmployeeSubscription != null) {
      this.saveEmployeeSubscription.unsubcribe()
    }
    if (this.getPositionSubscription != null) {
      this.getPositionSubscription.unsubscribe()
    }
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe()
    }
    if (this.employeeSubscription != null) {
      this.employeeSubscription.unsubscribe()
    }
  }



}
