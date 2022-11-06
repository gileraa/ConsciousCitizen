import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Subject } from 'rxjs';
import { EEventTypeOptions } from './enums/event-type-options.enum';
import { IEvent } from './interfaces/event.interface';
import { EventApiService } from './services/event-api.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EventsMapComponent implements OnInit, OnDestroy {
  private readonly destroyer$ = new Subject<void>();
  private readonly events: IEvent[] = [];
  private readonly markerIcon = {
    icon: leaflet.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      iconUrl: 'https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png',
      shadowUrl:
        'https://unpkg.com/leaflet@1.5.1/dist/images/marker-shadow.png',
    }),
  };
  private map: L.Map;
  private markers: L.Marker[] = [];
  private filterdEvents: IEvent[] = [];

  public readonly eventTypes: Record<EEventTypeOptions, string> = {
    [EEventTypeOptions.All]: 'Все',
    [EEventTypeOptions.Parking]: 'Парковки',
    [EEventTypeOptions.OutdatedProduct]: 'Просроченные продукты',
  };
  public readonly eventType = new FormControl();

  public selectedEvent: IEvent;

  constructor(private readonly eventApiService: EventApiService) {}

  public ngOnInit() {
    this.initFilter();
    this.initMap();

    this.eventApiService
      .getAllEvents()
      .pipe(takeUntil(this.destroyer$))
      .subscribe((events) => {
        this.events.push(...events);

        this.initMarkers(events);
      });

    this.eventType.valueChanges
      .pipe(takeUntil(this.destroyer$))
      .subscribe((value: EEventTypeOptions) => {
        this.filterdEvents = this.events.filter((event) => {
          if (value === EEventTypeOptions.All) {
            return true;
          }

          return event.type === value;
        });

        this.removeMarkers();
        this.initMarkers(this.filterdEvents);
      });
  }

  private initMap(): void {
    this.map = leaflet.map('map').setView([10, 10], 13);
    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(this.map);
  }

  private initFilter(): void {
    this.eventType.setValue(EEventTypeOptions.All);
  }

  private initMarkers(events: IEvent[]): void {
    events.forEach((event) => {
      const marker = leaflet
        .marker([event.lat, event.lng], this.markerIcon)
        .addTo(this.map)
        .on('click', () => {
          const selectedEvent = this.events.find(
            (event) =>
              event.lat === marker.getLatLng().lat &&
              event.lng === marker.getLatLng().lng
          );

          this.selectedEvent = selectedEvent;
        });

      this.markers.push(marker);
    });
  }

  private removeMarkers(): void {
    this.markers.forEach((marker) => marker.remove());
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
