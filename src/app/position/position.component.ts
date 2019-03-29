import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription: any;
  positionSubscription: any;
  savePositionSubscription: any;
  position: Position = new Position;
  successMessage: boolean = false;
  failMessage: boolean = false;

  constructor(private aRoute: ActivatedRoute, private positionServ: PositionService) { }

  ngOnInit() {
    this.paramSubscription=this.aRoute.params.subscribe((params)=>{
      this.positionSubscription=this.positionServ.getPosition(params['_id']).subscribe(pData => {
        this.position=pData[0];
      })
    })
  }

  onSubmit(f: NgForm): void{
    this.savePositionSubscription=this.positionServ.savePosition(this.position).subscribe(pData =>{
      this.successMessage=true;
      setTimeout(()=>{
        this.successMessage=false
      },2500)
    }, error =>{
      this.failMessage=true;
      setTimeout(()=>{
        this.failMessage=false
      }, 2500)
    })
  }

  ngOnDestry() {
    if (this.savePositionSubscription != null) {
      this.savePositionSubscription.unsubcribe()
    }
    if (this.positionSubscription != null) {
      this.positionSubscription.unsubscribe()
    }
    if (this.paramSubscription != null) {
      this.paramSubscription.unsubscribe()
    }
  }

}
