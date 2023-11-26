import { GerenciamentoRepository } from './../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioLogado } from './../../../../shared/utilities/usuario-logado/usuario-logado.utility';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { MensagemService } from '../../../../core/state/mensagem/mensagem-service/mensagem.service';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import {
  Canal,
  CanalInterface,
  CanalResponsavel,
  CanalResponsavelInterface,
} from '../../../../core/state/gerenciamento/canal/canal.entity';
import { SessionRepository } from '../../../../core/state/session/session.repository';
import { CanalApiService } from '../../state/canal.api.service';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { CanalRepository } from '../../state/canal.repository';
import { Subscription } from 'rxjs';
import { Cargo } from '../../../../core/state/gerenciamento/cargo/cargo.entity';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { MensagemRepository } from '../../../../core/state/mensagem/mensagem.repository';
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';

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
    private responsavelService: ResponsavelService,
    public usuarioLogado: UsuarioLogado,
    private mensagemService: MensagemService,
    private pageMenuService: PageMenuService,
    private sessionRepository: SessionRepository,
    private gerenciamentoRepository: GerenciamentoRepository,
    private mensagemRepository: MensagemRepository
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM;
    super(router, ROTA_BASE);

    this.preencherCanais();
  }

  ngOnInit() {}

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

  recarregarPagina() {
    this.canalService.buscarTodosCanaisMensagem().subscribe({
      next: () => {
        if (!this.isResponsavel) {
        } else {
          this.canalService
            .buscarCanalResponsavelTodos({ idResponsavel: this.usuarioLogado.getIdResponsavel() })
            .subscribe({
              next: () => {
                this.preencherCanais();
              },
            });
        }
      },
    });
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
        const canalMensagem = this.mensagemRepository.canais().find((canal) => {
          return canal.canal?.canal_id === idCanal && canal.responsavel?.responsavel_id === idResponsavel;
        });

        if (canalMensagem === undefined) {
          var novoCanalResponsavel: CanalResponsavelInterface = {
            canal_id: idCanal,
            responsavel_id: idResponsavel,
          };
          this.canalService.incluirCanalResponsavel(novoCanalResponsavel).subscribe({
            next: () => {
              if (novoCanalResponsavel.canal_responsavel_id !== undefined) {
                rota = novoCanalResponsavel.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL;
                this.navegarPara(rota);
              }
            },
          });
        } else {
          rota = canalMensagem.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL;
          this.navegarPara(rota);
        }
      } else {
        throw new Error('id responsavel nao definido');
      }
    } else {
      this.responsavelService.buscarTodosResponsaveis().subscribe({
        next: () => {
          this.canalService.buscarCanalResponsavelTodos({ idCanal: idCanal }).subscribe({
            next: () => {
              rota = idCanal + ConstantesRotas.ROTA_MENSAGEM_SELECAO_ALUNO;
              this.navegarPara(rota);
            },
          });
        },
      });
    }
  }

  resgatarUltimaMensagem(idCanal: string): string {
    if (this.isResponsavel) {
      const idResponsavel = this.usuarioLogado.getIdResponsavel();

      if (idResponsavel !== undefined) {
        const canalMensagem = this.mensagemRepository.canais().find((canal) => {
          return canal.canal?.canal_id === idCanal && canal.responsavel?.responsavel_id === idResponsavel;
        });
        if (canalMensagem !== undefined) {
          if (canalMensagem.mensagens !== undefined && canalMensagem.mensagens.length > 0) {
            // ultima mensagem enviada eh a primeira da lista
            const mensagem = canalMensagem.mensagens[0];
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

  preencherCanais() {
    const canais = this.mensagemRepository.listaCanais();
    this.canais = [];
    canais.forEach((canal) => {
      this.canais.push(new Canal(canal));
    });
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
