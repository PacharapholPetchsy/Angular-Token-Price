import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTokenPriceComponent } from './get-token-price.component';

describe('GetTokenPriceComponent', () => {
  let component: GetTokenPriceComponent;
  let fixture: ComponentFixture<GetTokenPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTokenPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTokenPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
