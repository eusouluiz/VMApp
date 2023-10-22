import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { Responsavel, Aluno, alunoVazio, Turma } from '../../../../shared/utilities/entidade/entidade.utility';
import { PaginaGerenciamento } from '../../../../shared/utilities/pagina-gerenciamento/pagina-gerenciamento.utility';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';
import { ResponsavelService } from '../../../../core/services/responsavel-service/responsavel.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { TurmaService } from '../../../../core/services/turma-service/turma.service';

@Component({
  selector: 'app-gerenciamento-aluno-detalhes',
  templateUrl: './gerenciamento-aluno-detalhes.page.html',
  styleUrls: ['./gerenciamento-aluno-detalhes.page.scss'],
})
export class GerenciamentoAlunoDetalhesPage extends PaginaGerenciamento implements OnInit {

  aluno: Aluno
  listaTodosResponsaveis: Responsavel[] | null = null
  listaTodasTurmas: Turma[] | null = null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private alunoService: AlunoService,
    private responsavelService: ResponsavelService,
    private turmaService: TurmaService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)

    this.definirModo()

    this.inicializarFormBuscaResponsavel()
    this.inicializarFormBuscaTurma()
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isModoDetalhes() && id !== null) {
      this.aluno = this.resgatarAluno(Number.parseInt(id))
      this.inicializarTabelaResponsaveis()
      this.inicializarTabelaTurmas()
    } else {
      this.aluno = alunoVazio()
      this.inicializarTabelaResponsaveis()
      this.inicializarTabelaTurmas()
    }

    this.form = this.formBuilder.group({
      nome: [this.aluno.nome, Validators.required],
      cgm: [this.aluno.cgm, Validators.required],
    })

    if (this.isModoDetalhes()) {
      this.form.disable()
    }
  }

  ngOnInit() {
  }

  // ---- busca aluno ----//
  private resgatarAluno(id: number): Aluno {
    const aluno = this.alunoService.buscarAluno(id)
    if (aluno !== undefined) {
      return aluno
    }
    return alunoVazio()
  }
  // ---- busca aluno ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.alunoService.deletarAluno(this.aluno.idAluno)
    this.retornarPagina()
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaResponsaveis()
    this.inicializarTabelaTurmas()
  }

  //cancelar edicao
  cancelar() {

    if (this.isModoCadastrar()) {
      this.retornarPagina()
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.aluno.nome,
      cgm: this.aluno.cgm,
    })
    this.form?.disable()

    this.inicializarTabelaResponsaveis()
    this.inicializarTabelaTurmas()
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {
      this.aluno.nome = this.form?.value.nome
      this.aluno.cgm = this.form?.value.telefone

      this.atualizarResponsaveis()

      if (this.isModoCadastrar()) {
        this.alunoService.incluirAluno(this.aluno)
      } else {
        this.alunoService.alterarAluno(this.aluno)
      }

      this.modo = 'detalhes'
      this.form?.disable()
    } else {
      this.form?.markAllAsTouched()
    }
  }
  // ---- controle botoes ----//

  // ---- controle responsaveis ----//

  formBuscaResponsavel!: UntypedFormGroup

  inicializarFormBuscaResponsavel() {
    this.formBuscaResponsavel = this.formBuilder.group({
      buscaResponsavel: ''
    })
  }

  //nome colunas
  listaResponsaveisBusca: Responsavel[] = []
  nomeResponsaveisBusca: string[] = []

  listaResponsaveisTabela!: Responsavel[]

  private inicializarTabelaResponsaveis() {
    this.listaResponsaveisTabela = this.aluno.responsaveis.slice()
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaResponsaveis()
    }
  }

  private inicializarBuscaResponsaveis() {
    // evitar com que lista de todos os responsaveis seja buscada toda hora
    if (this.listaTodosResponsaveis === null) {
      this.listaTodosResponsaveis = this.responsavelService.buscarTodosResponsaveis().slice()
    }

    this.listaResponsaveisBusca = []
    this.listaTodosResponsaveis.forEach((r) => {
      const idResponsavel = r.idResponsavel
      var isResponsavelPossuiResponsavel = false

      for (let i = 0; i < this.listaResponsaveisTabela.length; i++) {
        const responsavelResponsavel = this.listaResponsaveisTabela[i];
        if (responsavelResponsavel.idResponsavel === idResponsavel) {
          isResponsavelPossuiResponsavel = true
          break
        }
      }

      if (!isResponsavelPossuiResponsavel) {
        this.listaResponsaveisBusca.push(r)
      }
    })

    this.nomeResponsaveisBusca = this.resgatarNomeResponsaveisBusca(this.listaResponsaveisBusca)
    this.limparCampoBuscaResponsavel()
  }

  private resgatarNomeResponsaveisBusca(lista: Responsavel[]): string[] {
    var nomes: string[] = []
    lista.forEach(responsavel => {
      nomes.push(responsavel.nome)
    });
    return nomes
  }

  adicionarResponsavel(valor: number) {

    if (valor === -1) {
      this.navegarTelaResponsavel(valor)
      return
    }

    const responsavel = this.listaResponsaveisBusca[valor]

    this.listaResponsaveisTabela.push(responsavel)

    this.removerResponsavelDaListaBusca(valor)
    this.limparCampoBuscaResponsavel()
  }

  limparCampoBuscaResponsavel() {
    this.formBuscaResponsavel.setValue({
      buscaResponsavel: ''
    })
  }

  private removerResponsavelDaListaBusca(index: number) {
    for (let i = 0; i < this.listaResponsaveisBusca.length; i++) {
      if (index === i) {
        this.listaResponsaveisBusca.splice(index, 1)
        this.nomeResponsaveisBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarResponsaveis() {
    this.aluno.responsaveis = this.listaResponsaveisTabela.sort((r1, r2) => {
      if (r1.nome.toLowerCase() > r2.nome.toLowerCase()) {
        return 1
      } else if (r2.nome.toLowerCase() > r1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  navegarTelaResponsavel(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_RESPONSAVEL
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarResponsavel(id: number) {
    const indexResponsavel = this.listaResponsaveisTabela.findIndex((r) => {
      return r.idResponsavel === id
    })
    if (indexResponsavel !== -1) {
      const responsavel = this.listaResponsaveisTabela[indexResponsavel]
      this.listaResponsaveisTabela.splice(indexResponsavel, 1)


      this.listaResponsaveisBusca.push(responsavel)
      this.nomeResponsaveisBusca.push(responsavel.nome)
    }
  }

  // ---- controle responsaveis ----//

  // ---- controle turmas ----//

  formBuscaTurma!: UntypedFormGroup

  inicializarFormBuscaTurma() {
    this.formBuscaTurma = this.formBuilder.group({
      buscaTurma: ''
    })
  }

  //nome colunas
  listaTurmasBusca: Turma[] = []
  nomeTurmasBusca: string[] = []

  listaTurmasTabela: Turma[] = []

  private inicializarTabelaTurmas() {
    this.listaTurmasTabela = []
    if (this.aluno.turma.nome !== '') {
      this.listaTurmasTabela.push(this.aluno.turma)
    }
    if (!this.isModoDetalhes()) {
      this.inicializarBuscaTurmas()
    }
  }

  private inicializarBuscaTurmas() {
    // evitar com que lista de todos os turmas seja buscada toda hora
    if (this.listaTodasTurmas === null) {
      this.listaTodasTurmas = this.turmaService.buscarTodosTurmas().slice()
    }

    this.listaTurmasBusca = []
    this.listaTodasTurmas.forEach((t) => {
      const idTurma = t.idTurma
      var isFuncionarioPossuiTurma = false

      for (let i = 0; i < this.listaTurmasTabela.length; i++) {
        const alunoTurma = this.listaTurmasTabela[i];
        if (alunoTurma.idTurma === idTurma) {
          isFuncionarioPossuiTurma = true
          break
        }
      }

      if (!isFuncionarioPossuiTurma) {
        this.listaTurmasBusca.push(t)
      }
    })

    this.nomeTurmasBusca = this.resgatarNomeTurmasBusca(this.listaTurmasBusca)
    this.limparCampoBuscaTurma()
  }

  private resgatarNomeTurmasBusca(lista: Turma[]): string[] {
    var nomes: string[] = []
    lista.forEach(turma => {
      nomes.push(turma.nome)
    });
    return nomes
  }

  adicionarTurma(valor: number) {

    if (valor === -1) {
      this.navegarTelaTurma(valor)
      return
    }

    const turma = this.listaTurmasBusca[valor]

    // remove 1 para colocar outro
    if (this.listaTurmasTabela.length > 0) {
      this.deletarTurma()
    }
    this.listaTurmasTabela.push(turma)

    this.removerTurmaDaListaBusca(valor)
    this.limparCampoBuscaTurma()
  }

  limparCampoBuscaTurma() {
    this.formBuscaTurma.setValue({
      buscaTurma: ''
    })
  }

  private removerTurmaDaListaBusca(index: number) {
    for (let i = 0; i < this.listaTurmasBusca.length; i++) {
      if (index === i) {
        this.listaTurmasBusca.splice(index, 1)
        this.nomeTurmasBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarTurmas() {
    this.aluno.turma = this.listaTurmasTabela[0]
  }

  navegarTelaTurma(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_TURMA
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarTurma() {
    const turma = this.listaTurmasTabela[0]
    this.listaTurmasTabela.splice(0, 1)

    this.listaTurmasBusca.push(turma)
    this.nomeTurmasBusca.push(turma.nome)
  }

  // ---- controle turmas ----//

}
