import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensagemSelecaoAlunoPage } from './mensagem-selecao-aluno.page';

describe('MensagemSelecaoAlunoPage', () => {
  let component: MensagemSelecaoAlunoPage;
  let fixture: ComponentFixture<MensagemSelecaoAlunoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemSelecaoAlunoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensagemSelecaoAlunoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
