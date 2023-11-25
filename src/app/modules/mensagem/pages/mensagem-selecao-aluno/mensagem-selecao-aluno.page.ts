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
import { Responsavel } from '../../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';

interface ItemCanalResponsavel {
  nomeAluno: string;
  nomeResponsavel: string;
  idResponsavel: string;
  isMaisUmAluno: boolean
}

@Component({
  selector: 'app-mensagem-selecao-aluno',
  templateUrl: './mensagem-selecao-aluno.page.html',
  styleUrls: ['./mensagem-selecao-aluno.page.scss'],
})
export class MensagemSelecaoAlunoPage extends Pagina implements OnInit {
  canal!: Canal;

  listaTodosResponsaveis!: Responsavel[];

  listaCanalResponsavel: ItemCanalResponsavel[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
    private responsavelService: ResponsavelService,
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
    this.responsavelService.buscarTodosResponsaveis().subscribe({
      next: () => {
        this.preencherListaTodosResponsaveis()
        this.inicializarConteudo()
      }
    })
  }

  inicializarCanalResponsavel() {
    // esvaziar para encher
    this.listaCanalResponsavel = [];
    this.listaTodosResponsaveis.forEach((responsavel) => {
      if (responsavel.alunos !== undefined && responsavel.alunos.length > 0) {
        var apresentacaoAlunos: string = responsavel.alunos[0].nome

        if (responsavel.alunos.length > 1) {
          apresentacaoAlunos = responsavel.alunos[0].nome.split(' ')[0]
          for (let i = 1; i < responsavel.alunos.length; i++) {
            const aluno = responsavel.alunos[i];
            apresentacaoAlunos = apresentacaoAlunos + ' / ' + responsavel.alunos[i].nome.split(' ')[0]
          }
        }

        console.log(responsavel.alunos)
        console.log(apresentacaoAlunos)
        
        this.listaCanalResponsavel.push({
          nomeAluno: apresentacaoAlunos,
          nomeResponsavel: responsavel.usuario.nome,
          idResponsavel: responsavel.responsavel_id,
          isMaisUmAluno: responsavel.alunos.length > 1
        });
      }
    });
  }

  resgatarUltimaMensagem(idResponsavel: string): string {
    const canalMensagem = this.mensagemRepository.canais().find((canal) => {
      return canal.canal?.canal_id === this.canal.canal_id && canal.responsavel?.responsavel_id === idResponsavel
    })
    if (canalMensagem !== undefined) {
      if (canalMensagem.mensagens !== undefined && canalMensagem.mensagens.length > 0) {
        // ultima mensagem enviada eh a primeira da lista
        const mensagem = canalMensagem.mensagens[0]
        return 'Mensagem:' + mensagem.texto;
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
    this.preencherListaTodosResponsaveis()

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

  preencherListaTodosResponsaveis() {
    const responsaveis = this.gerenciamentoRepository.responsaveis().filter((responsavel) => {
      return responsavel.alunos !== undefined && responsavel.alunos.length > 0
    })
    this.listaTodosResponsaveis = []
    responsaveis.forEach((responsavel) => {
      this.listaTodosResponsaveis.push(new Responsavel(responsavel))
    })
  }
}
