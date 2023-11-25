import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { TurmaService } from '../../../../core/state/gerenciamento/turma/turma.service';
import { Aluno, AlunoInterface } from '../../../../core/state/gerenciamento/aluno/aluno.entity';
import { Responsavel } from '../../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { Turma } from '../../../../core/state/gerenciamento/turma/turma.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-gerenciamento-aluno-detalhes',
  templateUrl: './gerenciamento-aluno-detalhes.page.html',
  styleUrls: ['./gerenciamento-aluno-detalhes.page.scss'],
})
export class GerenciamentoAlunoDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  aluno: Aluno = new Aluno();

  listaTodosResponsaveis: Responsavel[] = [];
  listaTodosTurmas: Turma[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private alunoService: AlunoService,
    private responsavelService: ResponsavelService,
    private turmaService: TurmaService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.definirModo();
    this.inicializarForms();
    this.preencherListaTodosResponsaveis()
    this.preencherListaTodosTurmas()
    this.inicializarConteudo()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormAluno();
    this.inicializarFormBuscaResponsavel();
    this.inicializarFormBuscaTurma();
  }

  inicializarFormAluno() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      cgm: ['', Validators.required],
    });
  }

  recarregarPagina() {
    this.buscarResponsaveis()
    this.buscarTurmas()
    this.inicializarConteudo()
  }

  protected inicializarConteudo(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.aluno = this.resgatarAluno(id);
      this.form?.setValue({
        nome: this.aluno.nome,
        cgm: this.aluno.cgm,
      });
    }
    this.inicializarTabelaResponsaveis();
    this.inicializarTabelaTurmas();

    if (this.isModoDetalhes()) {
      this.form?.disable();
      this.formBuscaResponsavel.disable();
      this.formBuscaTurma.disable();
    }

    console.log(this.listaTurmasTabela)
  }

  // ---- busca aluno ----//
  private resgatarAluno(id: string): Aluno {
    this.alunoService.buscarAluno(id).subscribe();
    const aluno = this.gerenciamentoRepository.aluno(id)
    if (aluno !== undefined) {
      return new Aluno(aluno);
    }
    return new Aluno();
  }
  // ---- busca aluno ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.alunoService.deletarAluno(this.aluno.aluno_id).subscribe({
      next: () => {
        this.alunoService.removerAlunoInStorage(this.aluno.aluno_id)
        this.toastService.success('Sucesso ao Remover ' + this.aluno.nome);
        this.retornarPagina();
      },
      error: (err) => {
        this.toastService.error('Erro ao Remover Funcionário');

        if (err?.original?.status === 422) {
          return;
        }
      },
    });
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaTurmas();
  }

  protected habilitarForms(): void {
    this.form?.enable();
    this.formBuscaTurma?.enable();
    this.formBuscaResponsavel?.enable();
  }

  protected desabilitarForms(): void {
    this.form?.disable();
    this.formBuscaTurma?.disable();
    this.formBuscaResponsavel?.disable();
  }

  //cancelar edicao
  cancelar() {
    if (this.isModoCadastrar()) {
      this.retornarPagina();
      return;
    }

    this.modo = 'detalhes';

    this.form?.setValue({
      nome: this.aluno.nome,
      cgm: this.aluno.cgm,
    });
    this.desabilitarForms();

    this.inicializarTabelaResponsaveis();
    this.inicializarTabelaTurmas();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var aluno: AlunoInterface = {
        nome: this.form.value.nome,
        cgm: this.form.value.cgm,
      }
      aluno.turma_id = this.listaTurmasTabela.length > 0 ? this.listaTurmasTabela[0].turma_id : null

      if (this.isModoCadastrar()) {
        this.alunoService.incluirAluno(aluno).subscribe({
          next: () => {
            if (aluno.aluno_id !== undefined && aluno.aluno_id !== null) {
              this.aluno.aluno_id = aluno.aluno_id
            }
            this.atualizarAluno()
            this.atualizarTurmas()
            this.alunoService.saveAlunoInStorage(this.aluno.converterAlunoInterface())
            this.alunoService.vincularResponsaveis(this.aluno, this.listaResponsaveisTabela)
            this.atualizarResponsaveis()
            
            this.toastService.success('Sucesso ao cadastrar ' + this.aluno.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao cadastrar Aluno');
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        this.alunoService.alterarAluno(aluno, this.aluno.aluno_id).subscribe({
          next: () => {
            this.atualizarAluno()
            this.atualizarTurmas()
            this.alunoService.saveAlunoInStorage(this.aluno.converterAlunoInterface())
            this.alunoService.vincularResponsaveis(this.aluno, this.listaResponsaveisTabela)
            this.atualizarResponsaveis()

            this.toastService.success('Sucesso ao editar ' + this.aluno.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao editar Aluno');

            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      }


    } else {
      this.form?.markAllAsTouched();
    }
  }

  atualizarAluno() {
    this.aluno.nome = this.form?.value.nome;
    this.aluno.cgm = this.form?.value.cgm;
  }
  // ---- controle botoes ----//

  // ---- controle responsaveis ----//

  formBuscaResponsavel!: UntypedFormGroup;

  inicializarFormBuscaResponsavel() {
    this.formBuscaResponsavel = this.formBuilder.group({
      buscaResponsavel: '',
    });
  }

  listaResponsaveisBusca: Responsavel[] = [];
  nomeResponsaveisBusca: string[] = [];

  listaResponsaveisTabela!: Responsavel[];

  buscarResponsaveis() {
    this.responsavelService.buscarTodosResponsaveis().subscribe({
      next: () => {
        this.preencherListaTodosResponsaveis()
        this.inicializarBuscaResponsaveis()
      }
    });
  }

  preencherListaTodosResponsaveis() {
    const responsaveis = this.gerenciamentoRepository.responsaveis()
    this.listaTodosResponsaveis = []
    responsaveis.forEach((responsavel) => {
      this.listaTodosResponsaveis.push(new Responsavel(responsavel))
    })
  }

  private inicializarTabelaResponsaveis() {
    console.log(this.aluno)
    this.listaResponsaveisTabela = this.aluno.responsaveis.slice();
    this.inicializarBuscaResponsaveis()
  }

  private inicializarBuscaResponsaveis() {
    this.listaResponsaveisBusca = [];
    if (this.listaTodosResponsaveis.length > 0) {
      this.listaTodosResponsaveis.forEach((responsavel) => {
        const idResponsavel = responsavel.responsavel_id;
        var isAlunoPossuiResponsavel = false;

        for (let i = 0; i < this.listaResponsaveisTabela.length; i++) {
          const responsavelAluno = this.listaResponsaveisTabela[i];
          if (responsavelAluno.responsavel_id === idResponsavel) {
            isAlunoPossuiResponsavel = true;
            break;
          }
        }

        if (!isAlunoPossuiResponsavel) {
          this.listaResponsaveisBusca.push(responsavel);
        }
      });
    }

    this.resgatarNomeResponsaveisBusca(this.listaResponsaveisBusca);
    this.limparCampoBuscaResponsavel();
  }

  private resgatarNomeResponsaveisBusca(lista: Responsavel[]) {
    // esvazia lista
    this.nomeResponsaveisBusca.splice(0, this.nomeResponsaveisBusca.length)
    lista.forEach((responsavel) => {
      this.nomeResponsaveisBusca.push(responsavel.usuario.nome);
    });
  }

  adicionarResponsavel(valor: number) {
    if (valor === -1) {
      this.navegarTelaResponsavel();
      return;
    }

    const responsavel = this.listaResponsaveisBusca[valor];

    this.listaResponsaveisTabela.push(responsavel);

    this.removerResponsavelDaListaBusca(valor);
    this.limparCampoBuscaResponsavel();
  }

  limparCampoBuscaResponsavel() {
    this.formBuscaResponsavel.setValue({
      buscaResponsavel: '',
    });
  }

  private removerResponsavelDaListaBusca(index: number) {
    for (let i = 0; i < this.listaResponsaveisBusca.length; i++) {
      if (index === i) {
        // remove item da lista
        this.listaResponsaveisBusca.splice(index, 1);
        this.nomeResponsaveisBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarResponsaveis() {
    this.aluno.responsaveis = this.listaResponsaveisTabela.sort((responsavel1, responsavel2) => {
      if (responsavel1.usuario.nome.toLowerCase() > responsavel2.usuario.nome.toLowerCase()) {
        return 1;
      } else if (responsavel2.usuario.nome.toLowerCase() > responsavel1.usuario.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaResponsavel(responsavel?: Responsavel) {
    if (this.isModoDetalhes()) {
      var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL;
      if (responsavel !== undefined) {
        this.responsavelService.buscarResponsavel(responsavel.responsavel_id).subscribe({
          next: () => {
            rota = rota + ConstantesRotas.BARRA + responsavel.responsavel_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
            this.navegarPara(rota);
          },
          error: (err) => {
            this.toastService.error('Erro ao carregar informações ' + responsavel.usuario.nome);
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        })
      } else {
        rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
        this.navegarPara(rota);
      }
    }
  }
  
  deletarResponsavel(id: string) {
    const indexResponsavel = this.listaResponsaveisTabela.findIndex((responsavel) => {
      return responsavel.responsavel_id === id;
    });
    if (indexResponsavel !== -1) {
      const responsavel = this.listaResponsaveisTabela[indexResponsavel];
      this.listaResponsaveisTabela.splice(indexResponsavel, 1);

      this.listaResponsaveisBusca.push(responsavel);
      this.nomeResponsaveisBusca.push(responsavel.usuario.nome);
    }
  }

  // ---- controle responsaveis ----//

  // ---- controle turmas ----//

  formBuscaTurma!: UntypedFormGroup;

  inicializarFormBuscaTurma() {
    this.formBuscaTurma = this.formBuilder.group({
      buscaTurma: '',
    });
  }

  listaTurmasBusca: Turma[] = [];
  nomeTurmasBusca: string[] = [];

  listaTurmasTabela: Turma[] = [];

  buscarTurmas() {
    this.turmaService.buscarTodosTurmas().subscribe({
      next: () => {
        this.preencherListaTodosTurmas()
        this.inicializarBuscaTurmas()
      }
    });
  }

  preencherListaTodosTurmas() {
    const turmas = this.gerenciamentoRepository.turmas()
    this.listaTodosTurmas = []
    turmas.forEach((turma) => {
      this.listaTodosTurmas.push(new Turma(turma))
    })
  }

  private inicializarTabelaTurmas() {
    this.listaTurmasTabela = [];
    if (this.aluno.turma !== null && this.aluno.turma.nome !== '') {
      this.listaTurmasTabela.push(this.aluno.turma);
    }
    this.inicializarBuscaTurmas();
  }

  private inicializarBuscaTurmas() {
    this.listaTurmasBusca = [];
    if (this.listaTodosTurmas !== null) {
      this.listaTodosTurmas.forEach((turma) => {
        const idTurma = turma.turma_id;
        var isFuncionarioPossuiTurma = false;

        for (let i = 0; i < this.listaTurmasTabela.length; i++) {
          const alunoTurma = this.listaTurmasTabela[i];
          if (alunoTurma.turma_id === idTurma) {
            isFuncionarioPossuiTurma = true;
            break;
          }
        }

        if (!isFuncionarioPossuiTurma) {
          this.listaTurmasBusca.push(turma);
        }
      });
    }

    this.resgatarNomeTurmasBusca(this.listaTurmasBusca);
    this.limparCampoBuscaTurma();
  }

  private resgatarNomeTurmasBusca(lista: Turma[]) {
    // esvazia lista
    this.nomeTurmasBusca.splice(0, this.nomeTurmasBusca.length)
    lista.forEach((turma) => {
      this.nomeTurmasBusca.push(turma.nome);
    });
  }

  adicionarTurma(valor: number) {
    if (valor === -1) {
      this.navegarTelaTurma();
      return;
    }

    const turma = this.listaTurmasBusca[valor];

    // remove 1 para colocar outro
    if (this.listaTurmasTabela.length > 0) {
      this.deletarTurma();
    }
    this.listaTurmasTabela.push(turma);

    this.removerTurmaDaListaBusca(valor);
    this.limparCampoBuscaTurma();
  }

  limparCampoBuscaTurma() {
    this.formBuscaTurma.setValue({
      buscaTurma: '',
    });
  }

  private removerTurmaDaListaBusca(index: number) {
    for (let i = 0; i < this.listaTurmasBusca.length; i++) {
      if (index === i) {
        this.listaTurmasBusca.splice(index, 1);
        this.nomeTurmasBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarTurmas() {
    this.aluno.turma = this.listaTurmasTabela[0];
  }

  navegarTelaTurma(turma?: Turma) {
    if (this.isModoDetalhes()) {
      var rota = ConstantesRotas.ROTA_GERENCIAMENTO_TURMA;
      if (turma !== undefined) {
        this.turmaService.buscarTurma(turma.turma_id).subscribe({
          next: () => {
            rota = rota + ConstantesRotas.BARRA + turma.turma_id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
            this.navegarPara(rota);
          },
          error: (err) => {
            this.toastService.error('Erro ao carregar informações ' + turma.nome);
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        })
      } else {
        rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
        this.navegarPara(rota);
      }
    }
  }

  deletarTurma() {
    const turma = this.listaTurmasTabela[0];
    this.listaTurmasTabela.splice(0, 1);

    this.listaTurmasBusca.push(turma);
    this.nomeTurmasBusca.push(turma.nome);
  }

  // ---- controle turmas ----//

}
