import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDetailsComponent } from './auth-details.component';

describe('AuthDetailsComponent', () => {
  let component: AuthDetailsComponent;
  let fixture: ComponentFixture<AuthDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
