import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
})
export class HelpComponent implements OnInit {
  public readonly inputControl = new FormControl();

  constructor(private readonly matSnackBar: MatSnackBar) {}

  public ngOnInit(): void {}

  public send(): void {
    this.inputControl.reset();
    this.matSnackBar.open('Ваше сообщение отправлено успешно!', 'Закрыть', {
      duration: 3000,
    });
  }
}
