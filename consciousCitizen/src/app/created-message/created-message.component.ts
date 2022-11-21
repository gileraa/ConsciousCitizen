import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// import { FileUploadService } from 'src/app/services/upload-images.service';

@Component({
  selector: 'app-created-message',
  templateUrl: './created-message.component.html',
  styleUrls: ['./created-message.component.css'],
})
export class CreatedMessageComponent implements OnInit {
  imageInfos?: Observable<any>;
  public readonly eventTypes: Record<string, string> = {
    All: 'Все',
    Parking: 'Парковки',
    "OutdatedProduct ": 'Просроченные продукты',
  };
  public readonly eventType = new FormControl();
  // constructor(private uploadService: FileUploadService) {}
  constructor() {}

  ngOnInit(): void {
    // this.imageInfos = this.uploadService.getFiles();
  }
}
