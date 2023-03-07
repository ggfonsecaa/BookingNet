import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  tittleSection$ = new Subject<string>();

  constructor() { }

  setTittle(route: string): void {
      this.tittleSection$.next(route);
  }
}
