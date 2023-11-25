import { MensagemRepository } from './../../../../core/state/mensagem/mensagem.repository';
import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { MensagemService } from '../../../../core/state/mensagem/mensagem-service/mensagem.service';
import { Canal, CanalResponsavelInterface } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { Aluno } from '../../../../core/state/gerenciamento/aluno/aluno.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';

interface ItemCanalResponsavel {
  nomeAluno: string;
  nomeResponsavel: string;
  idResponsavel: string;
}

@Component({
  selector: 'app-mensagem-selecao-aluno',
  templateUrl: './mensagem-selecao-aluno.page.html',
  styleUrls: ['./mensagem-selecao-aluno.page.scss'],
})
export class MensagemSelecaoAlunoPage extends Pagina implements OnInit {
  canal!: Canal;

  listaTodosAlunos!: Aluno[];

  listaCanalResponsavel: ItemCanalResponsavel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
    private alunoService: AlunoService,
    private mensagemService: MensagemService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private mensagemRepository: MensagemRepository,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM;
    super(router, ROTA_BASE);

    this.inicializarConteudo();
  }

  ngOnInit() { }

  ionViewWillEnter(): void {
    this.pageMenuService.displayStatus.next(false);
  }

  recarregarPagina() {
    this.alunoService.buscarTodosAlunos().subscribe({
      next: () => {
        this.preencherListaTodosAlunos()
        this.inicializarConteudo()
      }
    })
  }

  inicializarCanalResponsavel() {
    // esvaziar para encher
    this.listaCanalResponsavel = [];
    this.listaTodosAlunos.forEach((a) => {
      if (a.responsaveis.length > 0) {
        a.responsaveis.forEach((r) => {
          this.listaCanalResponsavel.push({
            nomeAluno: a.nome,
            nomeResponsavel: r.usuario.nome,
            idResponsavel: r.responsavel_id,
          });
        });
      }
    });
  }

  resgatarUltimaMensagem(idResponsavel: string): string {
    const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(this.canal.canal_id, idResponsavel);

    if (idCanalResponsavel !== undefined) {
      const mensagem = this.mensagemService.buscarUltimaMensagensCanalResponsavel(idCanalResponsavel);
      if (mensagem !== undefined) {
        return 'Mensagem: ' + mensagem.texto;
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  navegarParaCanalResponsavel(idResponsavel: string) {
    var rota;

    const canalMensagem = this.mensagemRepository.canais().find((canal) => {
      return canal.canal?.canal_id === this.canal.canal_id && canal.responsavel?.responsavel_id === idResponsavel
    });
    if (canalMensagem === undefined) {
      var novoCanalResponsavel: CanalResponsavelInterface = {
        canal_id: this.canal.canal_id,
        responsavel_id: idResponsavel
      }
      this.canalService.incluirCanalResponsavel(novoCanalResponsavel).subscribe({
        next: () => {
          if (novoCanalResponsavel.canal_responsavel_id !== undefined) {
            rota = novoCanalResponsavel.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL
            this.navegarPara(rota);
          }
        }
      })
    } else { 
      rota = canalMensagem.canal_responsavel_id + ConstantesRotas.ROTA_MENSAGEM_CANAL
      this.navegarPara(rota);
    }
  }

  filtrarCanalResponsavel(ev: any) {
    var val = ev.target.value;
    this.inicializarCanalResponsavel();

    // se o valor for um valor valido
    this.listaCanalResponsavel = this.listaCanalResponsavel.filter((canal) => {
      return (
        canal.nomeAluno.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
        canal.nomeResponsavel.toLowerCase().indexOf(val.toLowerCase()) > -1
      );
    });
  }

  protected inicializarConteudo(): void {
    this.preencherListaTodosAlunos()

    const id = this.activatedRoute.snapshot.paramMap.get('idCanal');
    if (id !== null) {
      this.canal = this.resgatarCanal(id);
    } else {
      throw new Error('idCanal nao especificado na url');
    }

    this.inicializarCanalResponsavel();
  }

  private resgatarCanal(id: string): Canal {
    const canal = this.mensagemRepository.listaCanais().find((canal) => {
      return canal.canal_id = id
    });
    if (canal !== undefined) {
      return new Canal(canal);
    }
    throw new Error('Canal nao encontrado');
  }

  preencherListaTodosAlunos() {
    const alunos = this.gerenciamentoRepository.alunos()
    this.listaTodosAlunos = []
    alunos.forEach((aluno) => {
      this.listaTodosAlunos.push(new Aluno(aluno))
    })
  }
}
