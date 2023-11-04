import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoFuncionarioDetalhesPage } from './gerenciamento-funcionario-detalhes.page';

describe('GerenciamentoFuncionarioDetalhesPage', () => {
  let component: GerenciamentoFuncionarioDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoFuncionarioDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoFuncionarioDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoFuncionarioDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
