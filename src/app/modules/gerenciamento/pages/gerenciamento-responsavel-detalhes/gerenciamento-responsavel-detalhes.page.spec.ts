import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import GerenciamentoResponsavelDetalhesPage from './gerenciamento-responsavel-detalhes.page';

describe('GerenciamentoResponsavelDetalhesPage', () => {
  let component: GerenciamentoResponsavelDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoResponsavelDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GerenciamentoResponsavelDetalhesPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoResponsavelDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
