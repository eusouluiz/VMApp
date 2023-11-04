import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoAlunoDetalhesPage } from './gerenciamento-aluno-detalhes.page';

describe('GerenciamentoAlunoDetalhesPage', () => {
  let component: GerenciamentoAlunoDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoAlunoDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoAlunoDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoAlunoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
