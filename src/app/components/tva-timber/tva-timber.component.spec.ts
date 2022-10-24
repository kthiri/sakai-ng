import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvaTimberComponent } from './tva-timber.component';

describe('TvaTimberComponent', () => {
  let component: TvaTimberComponent;
  let fixture: ComponentFixture<TvaTimberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvaTimberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvaTimberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
