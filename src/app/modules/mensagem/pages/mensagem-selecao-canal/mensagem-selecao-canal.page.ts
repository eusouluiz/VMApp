import { GerenciamentoRepository } from './../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioLogado } from './../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { MensagemService } from '../../../../core/services/mensagem-service/mensagem.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { Canal, CanalInterface } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { SessionRepository } from '../../../../core/state/session/session.repository';
import { CanalApiService } from '../../state/canal.api.service';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { CanalRepository } from '../../state/canal.repository';
import { Subscription } from 'rxjs';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';

@Component({
  selector: 'app-mensagem-selecao-canal',
  templateUrl: './mensagem-selecao-canal.page.html',
  styleUrls: ['./mensagem-selecao-canal.page.scss'],
})
export class MensagemSelecaoCanalPage extends Pagina implements OnInit {
  canais: Canal[] = [];

  isResponsavel = this.usuarioLogado.isResponsavel();

  idCargo = this.usuarioLogado.getIdCargo();

  primeiroNome: string = '';

  userInfoSubscription: Subscription | undefined;

  canaisSubscription: Subscription | undefined;

  dataAvailable = false;

  constructor(
    private router: Router,
    private canalService: CanalService,
    private alunoService: AlunoService,
    public usuarioLogado: UsuarioLogado,
    private mensagemService: MensagemService,
    private pageMenuService: PageMenuService,
    private sessionRepository: SessionRepository,
    private gerenciamentoRepository: GerenciamentoRepository
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM;
    super(router, ROTA_BASE);

    this.resgatarCanais()
  }

  ngOnInit() { }

  OnDestroy() {
    this.userInfoSubscription?.unsubscribe();
  }

  ionViewWillEnter() {
    this.userInfoSubscription = this.sessionRepository.userInfo$.subscribe((info) => {
      if (info !== undefined) {
        if (info.nome !== undefined) {
          this.primeiroNome = info.nome.split(' ')[0];
        }
      }
    });

    this.pageMenuService.displayStatus.next(true);
  }
  
  recarregarPagina(){
    this.canalService.buscarTodosCanais().subscribe({
      next: () => {
        this.resgatarCanais()
      }
    })
  }

  verificarAcesso(canal: Canal): boolean {
    if (this.isResponsavel) {
      return true;
    }
    return this.verificarListaCargo(canal, this.idCargo);
  }

  navegarParaCanal(idCanal: string) {
    var rota: string;
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel();
      if (idResponsavel !== undefined) {
        var idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(idCanal, idResponsavel);
        if (idCanalResponsavel === undefined) {
          idCanalResponsavel = this.canalService.incluirCanalResponsavel(idCanal, idResponsavel)
        }
        rota = idCanalResponsavel + ConstantesRotas.ROTA_MENSAGEM_CANAL;
        this.navegarPara(rota);
      } else {
        throw new Error('id responsavel nao definido');
      }
    } else {
      this.canalService.buscarCanal(idCanal).subscribe({
        next: () => {
          this.alunoService.buscarTodosAlunos().subscribe({
            next: () => {
              rota = idCanal + ConstantesRotas.ROTA_MENSAGEM_SELECAO_ALUNO;
              this.navegarPara(rota);
            }
          })
        }
      })
    }
  }

  resgatarUltimaMensagem(idCanal: string): string {
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel();

      if (idResponsavel !== undefined) {
        const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(idCanal, idResponsavel);

        if (idCanalResponsavel !== undefined) {
          const mensagem = this.mensagemService.buscarUltimaMensagensCanalResponsavel(idCanalResponsavel);
          if (mensagem !== undefined) {
            return 'Mensagem:' + mensagem.texto;
          } else {
            return '';
          }
        } else {
          return '';
        }
      } else {
        throw new Error('id Responsavel nao definido');
      }
    } else {
      return '';
    }
  }
  
  resgatarCanais(){
    const canais = this.gerenciamentoRepository.canais()
    canais.forEach((canal) => {
      this.canais.push(new Canal(canal))
    })
    //TODO remover quando tiver cargos
    this.canais[0].cargos = []
    this.canais[0].cargos.push(new Cargo({cargo_id: '9a9f8804-94e5-4f5e-a0e5-d44b67731b0f', nome:'', descricao:''}))
  }

  private verificarListaCargo(canal: Canal, idCargo?: string | null): boolean {
    if (idCargo === undefined) {
      return false;
    }
    if (canal.cargos === undefined) {
      return false;
    }
    for (let i = 0; i < canal.cargos.length; i++) {
      const cargo = canal.cargos[i];
      if (cargo.cargo_id === idCargo) {
        return true;
      }
    }
    return false;
  }
}
