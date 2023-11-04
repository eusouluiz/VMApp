import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoCargoDetalhesPage } from './gerenciamento-cargo-detalhes.page';

describe('GerenciamentoCargoDetalhesPage', () => {
  let component: GerenciamentoCargoDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoCargoDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoCargoDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoCargoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
