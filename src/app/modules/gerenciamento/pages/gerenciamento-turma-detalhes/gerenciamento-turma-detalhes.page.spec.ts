import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoTurmaDetalhesPage } from './gerenciamento-turma-detalhes.page';

describe('GerenciamentoTurmaDetalhesPage', () => {
  let component: GerenciamentoTurmaDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoTurmaDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoTurmaDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoTurmaDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
