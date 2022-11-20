import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Email } from './smtp.js';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent implements OnInit {
  public readonly inputControl = new FormControl();

  constructor(private readonly matSnackBar: MatSnackBar) {}

  public ngOnInit(): void {}

  public send(): void {
    this.inputControl.reset();

    this.sendEmail();
  }

  private sendEmail(): void {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'symraklabs@gmail.com',
      Password: '9A754AA69FBB307D44EB02406A487D7CE31B',
      To: 'leraolera@mail.ru',
      From: 'symraklabs@gmail.com',
      Subject: 'Сознательный гражданин',
      Body: this.inputControl.value,
    }).then(() => this.showSnackBar());
  }

  private showSnackBar(): void {
    this.matSnackBar.open('Ваше сообщение отправлено успешно!', 'Закрыть', {
      duration: 3000,
    });
  }
}
