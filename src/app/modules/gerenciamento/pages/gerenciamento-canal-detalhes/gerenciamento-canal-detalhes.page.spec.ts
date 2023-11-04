import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciamentoCanalDetalhesPage } from './gerenciamento-canal-detalhes.page';

describe('GerenciamentoCanalDetalhesPage', () => {
  let component: GerenciamentoCanalDetalhesPage;
  let fixture: ComponentFixture<GerenciamentoCanalDetalhesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciamentoCanalDetalhesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciamentoCanalDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
