import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEvent } from '../interfaces/event.interface';
import { events } from '../stubs/event.stub';

@Injectable({ providedIn: 'root' })
export class EventApiService {
  public getAllEvents(): Observable<IEvent[]> {
    return of(events);
  }
}
