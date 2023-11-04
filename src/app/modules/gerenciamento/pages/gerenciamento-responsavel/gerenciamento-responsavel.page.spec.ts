import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoResponsavelPage } from './gerenciamento-responsavel.page';

describe('GerenciamentoResponsavelPage', () => {
  let component: GerenciamentoResponsavelPage;
  let fixture: ComponentFixture<GerenciamentoResponsavelPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoResponsavelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoResponsavelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
