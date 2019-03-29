import { Component, OnInit } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  positions: Position[];
  getPositionsSub:any;
  loadingError: boolean=false; 

  constructor(private pService: PositionService, private router:Router) { }

  ngOnInit() {
    this.getPositionsSub=this.pService.getPositions().subscribe(positions => this.positions=positions, err => this.loadingError=true);

  }

  routePosition(id: String) {
    this.router.navigate(['/position', id]);
  }
  
  ngOnDestroy(){
    if(this.getPositionsSub){
      this.getPositionsSub.unsubscribe();
    }
  }
}
