import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalGoldAreaComponent } from './modal-gold-area.component';

describe('ModalGoldAreaComponent', () => {
  let component: ModalGoldAreaComponent;
  let fixture: ComponentFixture<ModalGoldAreaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalGoldAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGoldAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
