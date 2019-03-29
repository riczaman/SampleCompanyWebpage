import { Injectable } from '@angular/core';
import { Position } from './position';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }
    getPositions(): Observable<Position[]>{
      return this.http.get<Position[]>('https://serene-mesa-90721.herokuapp.com/positions');
    }

    savePosition(position: Position): Observable<any>{
      return this.http.put<any>("https://serene-mesa-90721.herokuapp.com/position/" + position._id, position);
    }

    getPosition(id):Observable<Position[]>{
      return this.http.get<Position[]>("https://serene-mesa-90721.herokuapp.com/position/" + id);
    }
}
