import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {     
    routeBack$ = new Subject<string>();
    backButton$ = new Subject<boolean>();

    constructor() { }

    show(route: string): void {
        this.backButton$.next(true);
        this.routeBack$.next(route);
    }

    hide(): void {
        this.backButton$.next(false);
        this.routeBack$.next('');
    }
}
