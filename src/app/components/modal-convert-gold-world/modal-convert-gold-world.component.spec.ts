import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalConvertGoldWorldComponent } from './modal-convert-gold-world.component';

describe('ModalConvertGoldWorldComponent', () => {
  let component: ModalConvertGoldWorldComponent;
  let fixture: ComponentFixture<ModalConvertGoldWorldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalConvertGoldWorldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConvertGoldWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
