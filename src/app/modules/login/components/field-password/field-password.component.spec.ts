import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginFieldPasswordComponent } from './field-password.component';

xdescribe('LoginFieldPasswordComponent', () => {
  let component: LoginFieldPasswordComponent;
  let fixture: ComponentFixture<LoginFieldPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFieldPasswordComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFieldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
