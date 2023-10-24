import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensagemSelecaoCanalPage } from './mensagem-selecao-canal.page';

describe('MensagemSelecaoCanalPage', () => {
  let component: MensagemSelecaoCanalPage;
  let fixture: ComponentFixture<MensagemSelecaoCanalPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MensagemSelecaoCanalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensagemSelecaoCanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
