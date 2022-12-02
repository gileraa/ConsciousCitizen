import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EEventTypeOptions } from '../../enums/event-type-options.enum';
import { IEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EventCardComponent {
  @Input()
  public event!: IEvent;

  public getTypeTranslation(type: string): string {
    switch (type) {
      case EEventTypeOptions.OutdatedProduct:
        return 'Просроченные продукты';
      case EEventTypeOptions.Parking:
        return 'Парковка';
      default:
        return 'Неизвестная рубрика';
    }
  }
}
