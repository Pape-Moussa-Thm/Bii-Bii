import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdServiceService {

  constructor() { }

  private idSubject = new BehaviorSubject<number | null>(null);

  setId(id: number|null) {
    this.idSubject.next(id);
  }

  getId(): Observable<number | null> {
    return this.idSubject.asObservable();
  }
  
}


