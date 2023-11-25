import { UsuarioService } from '../../../../core/state/gerenciamento/usuario/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TurmaService } from '../../../../core/state/gerenciamento/turma/turma.service';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Turma, TurmaInterface } from '../../../../core/state/gerenciamento/turma/turma.entity';
import { Aluno } from '../../../../core/state/gerenciamento/aluno/aluno.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioInterface } from '../../../../core/state/gerenciamento/usuario/usuario.entity';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';
import { Funcionalidade } from '../../../../core/state/gerenciamento/funcionalidade/funcionalidade.entity';
import { FuncionalidadeService } from '../../../../core/state/gerenciamento/funcionalidade/funcionalidade.service';
import { FUNCIONALIDADE_DATA } from '../../../../shared/utilities/entidade/entidade.utility';

@Component({
  selector: 'app-gerenciamento-turma-detalhes',
  templateUrl: './gerenciamento-turma-detalhes.page.html',
  styleUrls: ['./gerenciamento-turma-detalhes.page.scss'],
})
export class GerenciamentoTurmaDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  turma: Turma = new Turma();

  listaTodosAlunos: Aluno[] = [];
  listaTodosFuncionalidades: Funcionalidade[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private usuarioService: UsuarioService,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private funcionalidadeService: FuncionalidadeService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.definirModo();
    this.inicializarForms();
    this.preencherListaTodosAlunos()
    this.inicializarConteudo()
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormTurma();
    this.inicializarFormBuscaAluno();
  }

  inicializarFormTurma() {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
    });
  }

  recarregarPagina() {
    this.buscarAlunos()
    this.inicializarConteudo()
  }

  protected inicializarConteudo(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.turma = this.resgatarTurma(id);
      console.log(this.turma)
      this.form?.setValue({
        nome: this.turma.nome,
      });
    }
    this.inicializarTabelaAlunos();

    if (this.isModoDetalhes()) {
      this.desabilitarForms()
    }
  }

  // ---- busca turma ----//
  private resgatarTurma(id: string): Turma {
    this.turmaService.buscarTurma(id).subscribe();
    const turma = this.gerenciamentoRepository.turma(id)
    console.log(turma)
    if (turma !== undefined) {
      return new Turma(turma);
    }
    return new Turma();
  }
  // ---- busca turma ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.turmaService.deletarTurma(this.turma.turma_id).subscribe({
      next: () => {
        this.turmaService.removerTurmaInStorage(this.turma.turma_id)
        this.toastService.success('Sucesso ao Remover ' + this.turma.nome);
        this.retornarPagina();
      },
      error: (err) => {
        this.toastService.error('Erro ao Remover Turma');

        if (err?.original?.status === 422) {
          return;
        }
      },
    });
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaAlunos();
  }

  protected habilitarForms(): void {
    this.form?.enable();
    this.formBuscaAluno?.enable();
  }

  protected desabilitarForms(): void {
    this.form?.disable();
    this.formBuscaAluno?.disable();
  }

  //cancelar edicao
  cancelar() {
    if (this.isModoCadastrar()) {
      this.retornarPagina();
      return;
    }

    this.modo = 'detalhes';

    this.form?.setValue({
      nome: this.turma.nome,
    });
    this.desabilitarForms();

    this.inicializarTabelaAlunos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var turma: TurmaInterface = {
        nome: this.form.value.nome,
        descricao: 'descricao'
      }

      if (this.isModoCadastrar()) {
        this.turmaService.incluirTurma(turma).subscribe({
          next: () => {
            if (turma.turma_id !== undefined && turma.turma_id !== null) {
              this.turma.turma_id = turma.turma_id
            }
            this.atualizarTurma()
            this.turmaService.saveTurmaInStorage(this.turma.converterTurmaInterface())
            this.turmaService.vincularAlunos(this.turma, this.listaAlunosTabela)
            this.atualizarAlunos()
            this.toastService.success('Sucesso ao cadastrar ' + this.turma.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao cadastrar Turma');
            
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        this.turmaService.alterarTurma(turma, this.turma.turma_id).subscribe({
          next: () => {
            this.atualizarTurma()
            this.turmaService.saveTurmaInStorage(this.turma.converterTurmaInterface())
            this.turmaService.vincularAlunos(this.turma, this.listaAlunosTabela)
            this.atualizarAlunos()
            this.toastService.success('Sucesso ao editar ' + this.turma.nome);
            this.retornarModoDetalhes()
          },
          error: (err) => {
            this.toastService.error('Erro ao editar Turma');

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

  atualizarTurma() {
    this.turma.nome = this.form?.value.nome;
  }
  // ---- controle botoes ----//

  // ---- controle alunos ----//

  formBuscaAluno!: UntypedFormGroup;

  inicializarFormBuscaAluno() {
    this.formBuscaAluno = this.formBuilder.group({
      buscaAluno: '',
    });
  }

  listaAlunosBusca: Aluno[] = [];
  nomeAlunosBusca: string[] = [];

  listaAlunosTabela!: Aluno[];

  buscarAlunos() {
    this.alunoService.buscarTodosAlunos().subscribe({
      next: () => {
        this.preencherListaTodosAlunos()
        this.inicializarBuscaAlunos()
      }
    });
  }

  preencherListaTodosAlunos() {
    const alunos = this.gerenciamentoRepository.alunos()
    this.listaTodosAlunos = []
    alunos.forEach((aluno) => {
      this.listaTodosAlunos.push(new Aluno(aluno))
    })
  }

  private inicializarTabelaAlunos() {
    this.listaAlunosTabela = this.turma.alunos.slice();
    this.inicializarBuscaAlunos()
  }

  private inicializarBuscaAlunos() {
    this.listaAlunosBusca = [];
    if (this.listaTodosAlunos.length > 0) {
      this.listaTodosAlunos.forEach((a) => {
        const idAluno = a.aluno_id;
        var isTurmaPossuiAluno = false;

        for (let i = 0; i < this.listaAlunosTabela.length; i++) {
          const turmaAluno = this.listaAlunosTabela[i];
          if (turmaAluno.aluno_id === idAluno) {
            isTurmaPossuiAluno = true;
            break;
          }
        }

        if (!isTurmaPossuiAluno) {
          this.listaAlunosBusca.push(a);
        }
      });
    }

    this.resgatarNomeAlunosBusca(this.listaAlunosBusca);
    this.limparCampoBuscaAluno();
  }

  private resgatarNomeAlunosBusca(lista: Aluno[]) {
    // esvazia lista
    this.nomeAlunosBusca.splice(0, this.nomeAlunosBusca.length)
    lista.forEach((aluno) => {
      this.nomeAlunosBusca.push(aluno.nome);
    });
  }

  adicionarAluno(valor: number) {
    if (valor === -1) {
      this.navegarTelaAluno(valor);
      return;
    }

    const aluno = this.listaAlunosBusca[valor];

    this.listaAlunosTabela.push(aluno);

    this.removerAlunoDaListaBusca(valor);
    this.limparCampoBuscaAluno();
  }

  limparCampoBuscaAluno() {
    this.formBuscaAluno.setValue({
      buscaAluno: '',
    });
  }

  private removerAlunoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaAlunosBusca.length; i++) {
      if (index === i) {
        // remove item da lista
        this.listaAlunosBusca.splice(index, 1);
        this.nomeAlunosBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarAlunos() {
    this.turma.alunos = this.listaAlunosTabela.sort((aluno1, aluno2) => {
      if (aluno1.nome.toLowerCase() > aluno2.nome.toLowerCase()) {
        return 1;
      } else if (aluno2.nome.toLowerCase() > aluno1.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaAluno(id: number) {
    if (this.isModoDetalhes()) {
      var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
      if (id !== -1) {
        rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
      } else {
        rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
      }
      this.navegarPara(rota);
    }
  }

  deletarAluno(id: string) {
    const indexAluno = this.listaAlunosTabela.findIndex((aluno) => {
      return aluno.aluno_id === id;
    });
    if (indexAluno !== -1) {
      const aluno = this.listaAlunosTabela[indexAluno];
      this.listaAlunosTabela.splice(indexAluno, 1);

      this.listaAlunosBusca.push(aluno);
      this.nomeAlunosBusca.push(aluno.nome);
    }
  }

  // ---- controle alunos ----//

}
