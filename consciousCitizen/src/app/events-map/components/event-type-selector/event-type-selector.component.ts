import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EEventTypeOptions } from '../../enums/event-type-options.enum';

@Component({
  selector: 'app-event-type-selector',
  templateUrl: './event-type-selector.component.html',
  styleUrls: ['./event-type-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTypeSelectorComponent implements OnInit, OnDestroy {
  private readonly destroyer$ = new Subject<void>();

  public readonly eventTypes: Record<EEventTypeOptions, string> = {
    [EEventTypeOptions.All]: 'Все',
    [EEventTypeOptions.Parking]: 'Парковки',
    [EEventTypeOptions.OutdatedProduct]: 'Просроченные продукты',
  };

  public readonly eventType = new FormControl();

  @Output()
  public readonly eventTypeChanged = new EventEmitter<EEventTypeOptions>();

  public ngOnInit(): void {
    this.initFilter();

    this.eventType.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroyer$))
      .subscribe((type) => this.eventTypeChanged.next(type));
  }

  private initFilter(): void {
    this.eventType.setValue(EEventTypeOptions.All);
  }

  public ngOnDestroy(): void {
    this.destroyer$.next();
    this.destroyer$.complete();
  }
}
