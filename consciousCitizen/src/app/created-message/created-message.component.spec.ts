import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedMessageComponent } from './created-message.component';

describe('CreatedMessageComponent', () => {
  let component: CreatedMessageComponent;
  let fixture: ComponentFixture<CreatedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
