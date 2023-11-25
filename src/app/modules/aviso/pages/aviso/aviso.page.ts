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
import { Aviso, AvisoInterface } from '../../../../core/state/aviso/aviso-service/aviso.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { AVISO_DATA } from '../../../../shared/utilities/entidade/entidade.utility';
import { AvisoRepository } from '../../../../core/state/aviso/aviso.repository';
import { DataUtil } from '../../../../shared/utilities/data/data.utility';
import { MensagemRepository } from '../../../../core/state/mensagem/mensagem.repository';
import { CanalResponsavelInterface } from '../../../../core/state/gerenciamento/canal/canal.entity';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.page.html',
  styleUrls: ['./aviso.page.scss'],
})
export class AvisoPage extends Pagina implements OnInit {
  avisos: Aviso[] = [];
  listaTurmasResponsavel: string[] = this.usuarioLogado.getListaIdTurmas()

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
    private mensagemRepository: MensagemRepository,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP;
    super(router, ROTA_BASE);

    this.inicializarConteudo();
  }
  
  ngOnInit() { }
  
  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(true);
    this.inicializarConteudo();
  }
  
  recarregarPagina(){
    this.avisoService.buscarTodosAvisos().subscribe({
      next: () => {
        this.resgatarAvisos()
      }
    })
  }

  resgatarAvisos() {
    const avisos = this.avisoRepository.avisos()
    this.avisos.splice(0, this.avisos.length)
    avisos.forEach((aviso) => {
      this.avisos.push(new Aviso(aviso))
    })
    if (!this.isResponsavel){
      this.avisoService.buscarTodosAvisosResponsavel().subscribe()
    }
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

      console.log(aviso)

      var avisoInterface: AvisoInterface = {
        titulo: aviso.titulo,
        texto: aviso.texto,
        arquivo: aviso.arquivo,
        data_publicacao: DataUtil.converterDataServico(aviso.data_publicacao.toString()),
        prioridade: aviso.prioridade,
        funcionario_id: aviso.funcionario.funcionario_id,
        canal_id: aviso.canal.canal_id,
      }

      console.log(avisoInterface)

      this.avisoService.alterarAviso(avisoInterface, aviso.aviso_id).subscribe();
    } else if (role === 'deletarAviso') {
      this.avisoService.deletarAviso(aviso.aviso_id).subscribe({
        next: () => {
          this.avisoService.removerAvisoInStorage(aviso.aviso_id)
          this.resgatarAvisos()
        }
      });
    } else if (role === 'duvidaAviso') {
      if (this.idResponsavel !== undefined) {
        var rota = ConstantesRotas.ROTA_MENSAGEM + ConstantesRotas.BARRA
        const canalMensagem = this.mensagemRepository.canais().find((canal) => {
          return canal.canal?.canal_id === aviso.canal.canal_id && canal.responsavel?.responsavel_id === this.idResponsavel
        })

        if (canalMensagem === undefined) {
          var novoCanalResponsavel: CanalResponsavelInterface = {
            canal_id: aviso.canal.canal_id,
            responsavel_id: this.idResponsavel
          }
          this.canalService.incluirCanalResponsavel(novoCanalResponsavel).subscribe({
            next: () => {
              if (novoCanalResponsavel.canal_responsavel_id !== undefined) {
                rota = rota + novoCanalResponsavel.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL
                this.navegarPara(rota);
              }
            }
          })
        } else {
          rota = rota + canalMensagem.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL;
          console.log(rota)
          this.navegarPara(rota);
        }
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

      const idFuncionario = this.usuarioLogado.getIdFuncionario()

      if (idFuncionario !== undefined) {
        var novoAviso: AvisoInterface = {
          titulo: data.titulo,
          texto: data.texto,
          arquivo: data.arquivo,
          data_publicacao: DataUtil.converterDataServico(data.data_publicacao),
          prioridade: data.prioridade,
          funcionario_id: idFuncionario,
          canal_id: data.canal.canal_id,
        }
      } else {
        throw new Error('Funcionario nao encontrado')
      }

      this.avisoService.incluirAviso(novoAviso).subscribe({
        next: () => {
          this.avisoService.vincularTurmas(new Aviso(novoAviso), data.turmas)
          this.avisoService.saveAvisoInStorage(novoAviso)
          this.inicializarConteudo()
        }
      });
    }
  }

  protected inicializarConteudo(): void {
    this.resgatarAvisos();
  }

  isVisivel(aviso: Aviso): boolean{
    if (this.isResponsavel) {
      for (let i = 0; i < aviso.turmas.length; i++) {
        const turma = aviso.turmas[i];
        if (this.listaTurmasResponsavel.includes(turma.turma_id)){
          return true
        }
      }
      return false
    }
    return true
  }
}
