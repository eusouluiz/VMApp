import { UsuarioService } from './../../../../core/services/usuario-service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ResponsavelService } from '../../../../core/state/gerenciamento/responsavel/responsavel.service';
import { AlunoService } from '../../../../core/state/gerenciamento/aluno/aluno.service';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { PaginaGerenciamentoDetalhes } from '../../../../shared/utilities/pagina-gerenciamento-detalhes/pagina-gerenciamento-detalhes.utility';
import { Responsavel } from '../../../../core/state/gerenciamento/responsavel/responsavel.entity';
import { Aluno } from '../../../../core/state/gerenciamento/aluno/aluno.entity';
import { PageMenuService } from '../../../../core/services/page-menu/page-menu.service';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';
import { UsuarioInterface } from '../../../../core/services/usuario-service/usuario.entity';
import { ToastService } from '../../../../core/toasts/services/toast-service/toast.service';

@Component({
  selector: 'app-gerenciamento-responsavel-detalhes',
  templateUrl: './gerenciamento-responsavel-detalhes.page.html',
  styleUrls: ['./gerenciamento-responsavel-detalhes.page.scss'],
})
export class GerenciamentoResponsavelDetalhesPage extends PaginaGerenciamentoDetalhes implements OnInit {
  responsavel: Responsavel = new Responsavel();

  listaTodosAlunos: Aluno[] | null = null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public location: Location,
    private usuarioService: UsuarioService,
    private responsavelService: ResponsavelService,
    private alunoService: AlunoService,
    private pageMenuService: PageMenuService,
    private gerenciamentoRepository: GerenciamentoRepository,
    private toastService: ToastService
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_GERENCIAMENTO;
    super(router, ROTA_BASE, location);

    this.definirModo();
    this.inicializarForms();
    this.inicializarConteudo();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.pageMenuService.displayStatus.next(false);
  }

  inicializarForms() {
    this.inicializarFormResponsavel();
    this.inicializarFormBuscaAluno();
  }

  inicializarFormResponsavel() {
    const senhaForm = this.isModoCadastrar() ? ['', Validators.required] : ['']

    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: senhaForm,
    });
  }

  protected inicializarConteudo(): void {
    this.alunoService.buscarTodosAlunos();

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.isModoDetalhes() && id !== null) {
      this.responsavel = this.resgatarResponsavel(id);
      this.form?.setValue({
        nome: this.responsavel.usuario.nome,
        telefone: this.responsavel.usuario.telefone,
        cpf: this.responsavel.usuario.cpf,
        senha: '',
      });
    }
    this.inicializarTabelaAlunos();

    if (this.isModoDetalhes()) {
      this.form?.disable();
      this.formBuscaAluno.disable();
    }
  }

  // ---- busca responsavel ----//
  private resgatarResponsavel(id: string): Responsavel {
    this.responsavelService.buscarResponsavel(id).subscribe();
    const responsavel = this.gerenciamentoRepository.responsavel(id)
    if (responsavel !== undefined) {
      return new Responsavel(responsavel);
    }
    return new Responsavel();
  }
  // ---- busca responsavel ----//

  // ---- controle botoes ----//

  //delecao
  protected deletar() {
    this.responsavelService.deletarResponsavel(this.responsavel.responsavel_id).subscribe();
    // this.usuarioService.deletarUsuario(this.responsavel.usuario.user_id).subscribe();
    this.retornarPagina();
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
      nome: this.responsavel.usuario.nome,
      telefone: this.responsavel.usuario.telefone,
      cpf: this.responsavel.usuario.cpf,
      senha: this.responsavel.usuario.password,
    });
    this.desabilitarForms();

    this.inicializarTabelaAlunos();
  }

  //salvar edicao
  salvar() {
    if (this.form?.valid) {

      var usuario: UsuarioInterface = {
        nome: this.form.value.nome,
        cpf: this.form.value.cpf,
        telefone: this.form.value.telefone,
        tipo: 'R',
      }

      if (this.isModoCadastrar()) {
        usuario.password = this.form?.value.senha
        this.usuarioService.incluirUsuario(usuario).subscribe({
          next: () => {
            this.atualizarResponsavel()
            this.toastService.success('Sucesso ao Cadastrar ' + this.responsavel.usuario.nome);
          },
          error: (err) => {
            this.toastService.error('Erro ao Cadastrar Responsável');
  
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      } else {
        if (this.form.value.senha !== ''){
          usuario.password = this.form?.value.senha
        }
        usuario.user_id = this.responsavel.usuario.user_id
        usuario.email = null
        this.usuarioService.alterarUsuario(usuario).subscribe({
          next: () => {
            this.atualizarResponsavel()
            this.toastService.success('Sucesso ao Editar ' + this.responsavel.usuario.nome);
          },
          error: (err) => {
            this.toastService.error('Erro ao Editar Responsável');
  
            if (err?.original?.status === 422) {
              return;
            }
          },
        });
      }

      this.retornarModoDetalhes()
    } else {
      this.form?.markAllAsTouched();
    }
  }

  atualizarResponsavel(){
    this.responsavel.usuario.nome = this.form?.value.nome;
    this.responsavel.usuario.telefone = this.form?.value.telefone;
    this.responsavel.usuario.cpf = this.form?.value.cpf;
    this.responsavel.usuario.password = this.form?.value.senha;

    this.atualizarAlunos();
  }
  // ---- controle botoes ----//

  // ---- controle alunos ----//

  formBuscaAluno!: UntypedFormGroup;

  inicializarFormBuscaAluno() {
    this.formBuscaAluno = this.formBuilder.group({
      busca: '',
    });
  }

  listaAlunosBusca: Aluno[] = [];
  nomeAlunosBusca: string[] = [];

  listaAlunosTabela!: Aluno[];

  private inicializarTabelaAlunos() {
    this.listaAlunosTabela = this.responsavel.alunos.slice();
    this.inicializarBuscaAlunos();
  }

  private inicializarBuscaAlunos() {
    this.listaAlunosBusca = [];
    if (this.listaTodosAlunos !== null) {
      this.listaTodosAlunos.forEach((a) => {
        const idAluno = a.aluno_id;
        var isResponsavelPossuiAluno = false;

        for (let i = 0; i < this.listaAlunosTabela.length; i++) {
          const responsavelAluno = this.listaAlunosTabela[i];
          if (responsavelAluno.aluno_id === idAluno) {
            isResponsavelPossuiAluno = true;
            break;
          }
        }

        if (!isResponsavelPossuiAluno) {
          this.listaAlunosBusca.push(a);
        }
      });
    }

    this.nomeAlunosBusca = this.resgatarNomeAlunosBusca(this.listaAlunosBusca);
    this.limparCampoBusca();
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
    this.limparCampoBusca();
  }

  limparCampoBusca() {
    this.formBuscaAluno.setValue({
      busca: '',
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
    this.responsavel.alunos = this.listaAlunosTabela.sort((a1, a2) => {
      if (a1.nome.toLowerCase() > a2.nome.toLowerCase()) {
        return 1;
      } else if (a2.nome.toLowerCase() > a1.nome.toLowerCase()) {
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
    const indexAluno = this.listaAlunosTabela.findIndex((a) => {
      return a.aluno_id === id;
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
