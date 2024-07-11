import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallerySasComponent } from './gallery-sas.component';

describe('GallerySasComponent', () => {
  let component: GallerySasComponent;
  let fixture: ComponentFixture<GallerySasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GallerySasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GallerySasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
