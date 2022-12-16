import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import * as leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Subject } from 'rxjs';
import { EEventTypeOptions } from './enums/event-type-options.enum';
import { IEvent } from './interfaces/event.interface';
import { EventApiService } from './services/event-api.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EventsMapComponent implements OnInit, OnDestroy {
  private static readonly MESSANGER_URL = 'messanger';

  private readonly destroyer$ = new Subject<void>();
  private readonly events: IEvent[] = [];
  private readonly draftEvents: IEvent[] = [];

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
  private filteredDraftEvents: IEvent[] = [];

  public selectedEvent: IEvent;
  public isMessangerMode = false;
  public activeTab: 'messages' | 'drafts' = 'messages';

  constructor(
    private readonly eventApiService: EventApiService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public get currentEvents(): IEvent[] {
    switch (this.activeTab) {
      case 'messages':
        return this.events;
      case 'drafts':
        return this.draftEvents;
    }
  }

  public ngOnInit() {
    this.initMap();

    this.isMessangerMode = this.router.url.includes(
      EventsMapComponent.MESSANGER_URL
    );

    this.eventApiService
      .getAllEvents()
      .pipe(takeUntil(this.destroyer$))
      .subscribe((events) => {
        if (!events) {
          return;
        }

        events.forEach((event) => {
          if (event.isDraft) {
            this.draftEvents.push(event);
          } else {
            this.events.push(event);
          }
        });

        this.removeMarkers();
        this.initMarkers(this.currentEvents);
      });
  }

  public toDraft(): void {
    const events = JSON.parse(localStorage.getItem('events')) as IEvent[];

    const event = events.find((event) => event.id === this.selectedEvent.id);

    if (event) {
      event.isDraft = true;
      localStorage.setItem('events', JSON.stringify(events));

      this.showDrafts();
    }
  }

  public publish(): void {
    const events = JSON.parse(localStorage.getItem('events')) as IEvent[];

    const event = events.find((event) => event.id === this.selectedEvent.id);

    if (event) {
      event.isDraft = false;
      localStorage.setItem('events', JSON.stringify(events));

      this.showMessages();
    }

    this.eventApiService
      .changeEventStatusById(this.selectedEvent.id)
      .subscribe();
  }

  public showMessages(): void {
    this.activeTab = 'messages';

    this.doMagic();
  }

  public showDrafts(): void {
    this.activeTab = 'drafts';

    this.doMagic();
  }

  public changeEventType(value: EEventTypeOptions): void {
    this.filterdEvents = this.currentEvents.filter((event) => {
      if (value === EEventTypeOptions.All) {
        return true;
      }

      return event.type === value;
    });

    this.selectedEvent = undefined;
    this.removeMarkers();
    this.initMarkers(this.filterdEvents);
  }

  private initMap(): void {
    const mapContainer = leaflet.DomUtil.get('map');
    if (mapContainer['_leaflet_id'] != null) {
      mapContainer.remove();
    }

    this.map = leaflet.map('map').setView([10, 10], 13);
    leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(this.map);
  }

  private doMagic(): void {
    this.draftEvents.splice(0);
    this.events.splice(0);

    this.eventApiService
      .getAllEvents()
      .pipe(takeUntil(this.destroyer$))
      .subscribe((events) => {
        if (!events) {
          return;
        }

        events.forEach((event) => {
          if (event.isDraft) {
            this.draftEvents.push(event);
          } else {
            this.events.push(event);
          }
        });

        this.selectedEvent = undefined;
        this.removeMarkers();
        this.initMarkers(this.currentEvents);
      });
  }

  private initMarkers(events: IEvent[]): void {
    events.forEach((event) => {
      const marker = leaflet
        .marker([event.lat, event.lng], this.markerIcon)
        .addTo(this.map)
        .on('click', () => {
          const selectedEvent = this.currentEvents.find(
            (event) =>
              parseFloat(event.lat.toString()) === marker.getLatLng().lat &&
              parseFloat(event.lng.toString()) === marker.getLatLng().lng
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
