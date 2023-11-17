import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AvisoIndicadorVisualizacaoComponent } from './aviso-indicador-visualizacao.component';

describe('AvisoIndicadorVisualizacaoComponent', () => {
  let component: AvisoIndicadorVisualizacaoComponent;
  let fixture: ComponentFixture<AvisoIndicadorVisualizacaoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisoIndicadorVisualizacaoComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoIndicadorVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
