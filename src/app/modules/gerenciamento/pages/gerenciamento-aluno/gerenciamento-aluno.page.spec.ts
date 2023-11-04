import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoAlunoPage } from './gerenciamento-aluno.page';

describe('GerenciamentoAlunoPage', () => {
  let component: GerenciamentoAlunoPage;
  let fixture: ComponentFixture<GerenciamentoAlunoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoAlunoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
