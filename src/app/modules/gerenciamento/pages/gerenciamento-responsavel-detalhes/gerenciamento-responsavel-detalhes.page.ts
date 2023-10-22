import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common'
import { Aluno, Responsavel, responsavelVazio } from '../../../../shared/utilities/entidade/entidade.utility';
import { ResponsavelService } from '../../../../core/services/responsavel-service/responsavel.service';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamento } from '../../../../shared/utilities/pagina-gerenciamento/pagina-gerenciamento.utility';

@Component({
  selector: 'app-gerenciamento-responsavel-detalhes',
  templateUrl: './gerenciamento-responsavel-detalhes.page.html',
  styleUrls: ['./gerenciamento-responsavel-detalhes.page.scss'],
})
export default class GerenciamentoResponsavelDetalhesPage extends PaginaGerenciamento implements OnInit {

  responsavel: Responsavel
  listaTodosAlunos: Aluno[] | null = null

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: PlatformLocation,
    private responsavelService: ResponsavelService,
    private alunoService: AlunoService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO
    super(router, ROTA_BASE, location)

    this.definirModo()

    this.inicializarFormBuscaAluno()
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.isModoDetalhes() && id !== null) {
      this.responsavel = this.resgatarResponsavel(Number.parseInt(id))
      this.inicializarTabelaAlunos()
    } else {
      this.responsavel = responsavelVazio()
      this.inicializarTabelaAlunos()
    }

    this.form = this.formBuilder.group({
      nome: [this.responsavel.nome, Validators.required],
      telefone: [this.responsavel.usuario.telefone, Validators.required],
      cpf: [this.responsavel.usuario.cpf, Validators.required],
      senha: [this.responsavel.usuario.senha, Validators.required],
    })

    if (this.isModoDetalhes()) {
      this.form.disable()
    }
  }

  ngOnInit() {
  }

  // ---- busca responsavel ----//
  private resgatarResponsavel(id: number): Responsavel {
    const responsavel = this.responsavelService.buscarResponsavel(id)
    if (responsavel !== undefined) {
      return responsavel
    }
    return responsavelVazio()
  }
  // ---- busca responsavel ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.responsavelService.deletarResponsavel(this.responsavel.idResponsavel)
    this.retornarPagina()
  }

  //edicao

  protected inicializarComponentesEdicao() {
    this.inicializarTabelaAlunos()
  }

  //cancelar edicao
  cancelar() {

    if (this.isModoCadastrar()) {
      this.retornarPagina()
      return
    }

    this.modo = 'detalhes'

    this.form?.setValue({
      nome: this.responsavel.nome,
      telefone: this.responsavel.usuario.telefone,
      cpf: this.responsavel.usuario.cpf,
      senha: this.responsavel.usuario.senha,
    })
    this.form?.disable()

    this.inicializarTabelaAlunos()
  }

  //salvar edicao
  salvar() {
    console.log('salvar')
    if (this.form?.valid) {
      this.responsavel.nome = this.form?.value.nome
      this.responsavel.usuario.telefone = this.form?.value.telefone
      this.responsavel.usuario.cpf = this.form?.value.cpf
      this.responsavel.usuario.senha = this.form?.value.senha

      this.atualizarAlunos()

      if (this.isModoCadastrar()) {
        this.responsavelService.incluirResponsavel(this.responsavel)
      } else {
        this.responsavelService.alterarResponsavel(this.responsavel)
      }

      this.modo = 'detalhes'
      this.form?.disable()
    } else {
      this.form?.markAllAsTouched()
    }
  }
  // ---- controle botoes ----//

  // ---- controle alunos ----//

  formBuscaAluno!: UntypedFormGroup

  inicializarFormBuscaAluno() {
    this.formBuscaAluno = this.formBuilder.group({
      busca: ''
    })
  }

  //nome colunas
  listaAlunosBusca: Aluno[] = []
  nomeAlunosBusca: string[] = []

  listaAlunosTabela!: Aluno[]

  private inicializarTabelaAlunos() {
    this.listaAlunosTabela = this.responsavel.alunos.slice()
    if (!this.isModoDetalhes()) {
      this.inicializaBuscaAlunos()
    }
  }

  private inicializaBuscaAlunos() {
    // evitar com que lista de todos os alunos seja buscada toda hora
    if (this.listaTodosAlunos === null) {
      this.listaTodosAlunos = this.alunoService.buscarTodosAlunos().slice()
    }

    this.listaAlunosBusca = []
    this.listaTodosAlunos.forEach((a) => {
      const idAluno = a.idAluno
      var isResponsavelPossuiAluno = false

      for (let i = 0; i < this.listaAlunosTabela.length; i++) {
        const responsavelAluno = this.listaAlunosTabela[i];
        if (responsavelAluno.idAluno === idAluno) {
          isResponsavelPossuiAluno = true
          break
        }
      }

      if (!isResponsavelPossuiAluno) {
        this.listaAlunosBusca.push(a)
      }
    })

    this.nomeAlunosBusca = this.resgatarNomeAlunosBusca(this.listaAlunosBusca)
    this.limparCampoBusca()
  }

  private resgatarNomeAlunosBusca(lista: Aluno[]): string[] {
    var nomes: string[] = []
    lista.forEach(aluno => {
      nomes.push(aluno.nome)
    });
    return nomes
  }

  adicionarAluno(valor: number) {

    if (valor === -1) {
      this.navegarTelaAluno(valor)
      return
    }

    const aluno = this.listaAlunosBusca[valor]

    this.listaAlunosTabela.push(aluno)

    this.removerAlunoDaListaBusca(valor)
    this.limparCampoBusca()
  }

  limparCampoBusca() {
    this.formBuscaAluno.setValue({
      busca: ''
    })
  }

  private removerAlunoDaListaBusca(index: number) {
    for (let i = 0; i < this.listaAlunosBusca.length; i++) {
      if (index === i) {
        this.listaAlunosBusca.splice(index, 1)
        this.nomeAlunosBusca.splice(index, 1)
        break;
      }
    }
  }

  private atualizarAlunos() {
    this.responsavel.alunos = this.listaAlunosTabela.sort((a1, a2) => {
      if (a1.nome.toLowerCase() > a2.nome.toLowerCase()) {
        return 1
      } else if (a2.nome.toLowerCase() > a1.nome.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    })
  }

  navegarTelaAluno(id: number) {
    var rota = ConstantesRotas.ROTA_GERENCIAMENTO_ALUNO
    if (id !== -1) {
      rota = rota + ConstantesRotas.BARRA + id + ConstantesRotas.ROTA_GERENCIAMENTO_DETALHES
    } else {
      rota = rota + ConstantesRotas.ROTA_GERENCIAMENTO_CADASTRO
    }
    this.navegarPara(rota)
  }

  deletarAluno(id: number) {
    const indexAluno = this.listaAlunosTabela.findIndex((a) => {
      return a.idAluno === id
    })
    const aluno = this.listaAlunosTabela[indexAluno]
    if (indexAluno !== -1) {
      this.listaAlunosTabela.splice(indexAluno, 1)


      this.listaAlunosBusca.push(aluno)
      this.nomeAlunosBusca.push(aluno.nome)
    }
  }

  // ---- controle alunos ----//

}
