import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { BASE_URL, TOKEN } from 'src/app/shared/consts';
import { EEventTypeOptions } from '../enums/event-type-options.enum';
import { IEvent, IEventDto } from '../interfaces/event.interface';

@Injectable({ providedIn: 'root' })
export class EventApiService {
  private readonly url = `${BASE_URL}/events`;

  constructor(private readonly http: HttpClient) {}

  public getAllEvents(): Observable<IEvent[]> {
    const headers = new HttpHeaders();
    headers.set('Authorization', `Basic ${TOKEN}`);

    return this.http.get<IEventDto[]>(this.url, { headers: headers }).pipe(
      map((eventsDto) => {
        if (!eventsDto || eventsDto.length === 0) {
          return [];
        }

        const events: IEvent[] = eventsDto.map((eventDto) =>
          this.parseEvent(eventDto)
        );

        return events;
      })
    );
  }

  private parseEvent(eventDto: IEventDto): IEvent {
    const eventDtoAddress = eventDto.address;

    return {
      lat: eventDto.address.latitude,
      lng: eventDto.address.longitude,
      description: eventDto.messageText,
      type: eventDto.theme,
      name: eventDto.rubric.name,
      address: `${eventDtoAddress.street} ${eventDtoAddress.building}`,
      date: eventDto.date,
      imageBase64: eventDto.image,
    };
  }
}
