import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { TurmaService } from '../../../../core/services/turma-service/turma.service';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { Turma } from '../../../../core/services/turma-service/turma.entity';
import { Aluno } from '../../../../core/services/aluno-service/aluno.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';

@Component({
  selector: 'app-gerenciamento-turma-detalhes',
  templateUrl: './gerenciamento-turma-detalhes.page.html',
  styleUrls: ['./gerenciamento-turma-detalhes.page.scss'],
})
export class GerenciamentoTurmaDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  turma: Turma = new Turma();

  listaTodosAlunos: Aluno[] | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private turmaService: TurmaService,
    private alunoService: AlunoService,
    private pageMenuService: PageMenuService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.inicializarForms();
    this.inicializarConteudo();
  }

  ngOnInit() {}

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

  protected inicializarConteudo(): void {
    this.listaTodosAlunos = this.alunoService.buscarTodosAlunos().slice();

    this.definirModo();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.turma = this.resgatarTurma(id);

      this.form?.setValue({
        nome: this.turma.nome,
      });
    }
    this.inicializarTabelaAlunos();

    if (this.isModoDetalhes()) {
      this.form?.disable();
    }
  }

  // ---- busca turma ----//
  private resgatarTurma(id: string): Turma {
    const turma = this.turmaService.buscarTurma(id);
    if (turma !== undefined) {
      return turma;
    }
    return new Turma();
  }
  // ---- busca turma ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.turmaService.deletarTurma(this.turma.turma_id);
    this.retornarPagina();
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaAlunos();
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
    this.form?.disable();

    this.inicializarTabelaAlunos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.turma.nome = this.form?.value.nome;

      this.atualizarAlunos();

      if (this.isModoCadastrar()) {
        this.turmaService.incluirTurma(this.turma);
      } else {
        this.turmaService.alterarTurma(this.turma);
      }

      this.modo = 'detalhes';
      this.form?.disable();
    } else {
      this.form?.markAllAsTouched();
    }
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

  private inicializarTabelaAlunos() {
    this.listaAlunosTabela = this.turma.alunos.slice();
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaAlunos();
    }
  }

  private inicializarBuscaAlunos() {
    this.listaAlunosBusca = [];
    if (this.listaTodosAlunos !== null) {
      this.listaTodosAlunos.forEach((f) => {
        const idAluno = f.aluno_id;
        var isAlunoPossuiAluno = false;

        for (let i = 0; i < this.listaAlunosTabela.length; i++) {
          const alunoAluno = this.listaAlunosTabela[i];
          if (alunoAluno.aluno_id === idAluno) {
            isAlunoPossuiAluno = true;
            break;
          }
        }

        if (!isAlunoPossuiAluno) {
          this.listaAlunosBusca.push(f);
        }
      });
    }

    this.nomeAlunosBusca = this.resgatarNomeAlunosBusca(this.listaAlunosBusca);
    this.limparCampoBuscaAluno();
  }

  private resgatarNomeAlunosBusca(lista: Aluno[]): string[] {
    var nomes: string[] = [];
    lista.forEach((aluno) => {
      nomes.push(aluno.nome);
    });
    return nomes;
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
        this.listaAlunosBusca.splice(index, 1);
        this.nomeAlunosBusca.splice(index, 1);
        break;
      }
    }
  }

  private atualizarAlunos() {
    this.turma.alunos = this.listaAlunosTabela.sort((f1, f2) => {
      if (f1.nome.toLowerCase() > f2.nome.toLowerCase()) {
        return 1;
      } else if (f2.nome.toLowerCase() > f1.nome.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  navegarTelaAluno(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO;
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES;
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO;
    }
    this.navegarPara(rota);
  }

  deletarAluno(id: string) {
    const indexAluno = this.listaAlunosTabela.findIndex((r) => {
      return r.aluno_id === id;
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
