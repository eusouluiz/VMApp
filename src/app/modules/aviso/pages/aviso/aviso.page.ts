import { ModalController } from '@ionic/angular';
import { AvisoService } from '../../../../core/state/aviso/aviso-service/aviso.service';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import {
  ConstantesFuncionalidades,
  ConstantesRotas,
} from '../../../../shared/utilities/constantes/constantes.utility';
import { AvisoModalComponent } from '../../components/aviso-modal/aviso-modal.component';
import { UsuarioLogado } from '../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { NovoAvisoComponent } from '../../components/novo-aviso/novo-aviso.component';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { Aviso } from '../../../../core/state/aviso/aviso-service/aviso.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { AVISO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { AvisoRepository } from '../../../../core/state/aviso/aviso.repository';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.page.html',
  styleUrls: ['./aviso.page.scss'],
})
export class AvisoPage extends Pagina implements OnInit {
  avisos: Aviso[] = [];

  //continuar restricao de avisos
  idResponsavel?: string = this.usuarioLogado.getIdResponsavel();

  isResponsavel?: boolean = this.usuarioLogado.isResponsavel();

  constructor(
    private router: Router,
    private avisoService: AvisoService,
    private modalController: ModalController,
    private usuarioLogado: UsuarioLogado,
    private canalService: CanalService,
    private pageMenuService: PageMenuService,
    private avisoRepository: AvisoRepository,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP;
    super(router, ROTA_BASE);

    this.inicializarConteudo();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(true);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log(this.avisos);
  }

  resgatarAvisos() {
    const avisos = this.avisoRepository.avisos()
    this.avisos = []
    avisos.forEach((aviso) => {
      this.avisos.push(new Aviso(aviso))
    })
  }

  async abrirModalAviso(aviso: Aviso) {
    var modal;
    modal = await this.modalController.create({
      component: AvisoModalComponent,
      mode: 'md',
      cssClass: 'c-ion-modal--sheet',
      initialBreakpoint: 0.82,
      componentProps: {
        modo: 'detalhes',
        aviso: aviso,
        isResponsavel: this.isResponsavel,
        hasAcessoGerenciamentoAviso: this.hasAcessoGerenciamentoAviso(),
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'salvarAviso') {
      aviso.titulo = data.titulo;
      aviso.texto = data.texto;

      // this.avisoService.alterarAviso(aviso, aviso.aviso_id);
    } else if (role === 'deletarAviso') {
      this.avisoService.deletarAviso(aviso.aviso_id);
    } else if (role === 'duvidaAviso') {
      if (this.idResponsavel !== undefined) {
        const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(
          aviso.canal.canal_id,
          this.idResponsavel
        );
        const caminho =
          ConstantesRotas.ROTA_MENSAGEM +
          ConstantesRotas.BARRA +
          idCanalResponsavel +
          ConstantesRotas.ROTA_MENSAGEM_CANAL;

        this.navegarPara(caminho);
      } else {
        throw new Error('Aviso: responsavel nao encontrado');
      }
    }
  }

  hasAcessoGerenciamentoAviso() {
    return this.usuarioLogado
      .getFuncionalidadesAcessoId()
      ?.includes(ConstantesFuncionalidades.GERENCIAMENTO_AVISO);
  }

  async abrirModalNovoAviso() {
    const modal = await this.modalController.create({
      component: NovoAvisoComponent,
      mode: 'md',
      cssClass: 'c-ion-modal--sheet u-flex-direction--column u-flex-justify--end',
      initialBreakpoint: 0.95,
      componentProps: {},
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'salvarAviso') {
      console.log(data);

      this.avisoService.incluirAviso(data);
    }
  }

  protected inicializarConteudo(): void {
    this.resgatarAvisos();
  }
}
