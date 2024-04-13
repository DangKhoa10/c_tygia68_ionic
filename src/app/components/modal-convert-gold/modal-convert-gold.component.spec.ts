import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalConvertGoldComponent } from './modal-convert-gold.component';

describe('ModalConvertGoldComponent', () => {
  let component: ModalConvertGoldComponent;
  let fixture: ComponentFixture<ModalConvertGoldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalConvertGoldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConvertGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
