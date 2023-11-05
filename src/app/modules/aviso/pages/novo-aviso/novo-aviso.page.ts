import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ConstantesPrioridadesAvisos, ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { FieldSelectOption } from '../../../../shared/components/field-select/field-select.interface';
import { Aviso, Canal, Lembrete, Turma, avisoVazio, lembreteVazio } from '../../../../shared/utilities/entidade/entidade.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { TurmaService } from '../../../../core/services/turma-service/turma.service';
import { AvisoService } from '../../../../core/services/aviso-service/aviso.service';
import { LembreteService } from '../../../../core/services/lembrete-service copy/lembrete.service';

@Component({
  selector: 'app-novo-aviso',
  templateUrl: './novo-aviso.page.html',
  styleUrls: ['./novo-aviso.page.scss'],
})
export class NovoAvisoPage extends Pagina implements OnInit {

  aviso: Aviso = avisoVazio()
  form: UntypedFormGroup | undefined;
  listaTodosCanais: Canal[] = []
  listaTodasTurmas: Turma[] = [];
  canalDuvidas?: Canal

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private avisoService: AvisoService,
    private lembreteService: LembreteService,
    private canalService: CanalService,
    private turmaService: TurmaService,
  ) { 
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_AVISO
    super(router, ROTA_BASE)
    
    this.inicializarForms()
    this.inicializarConteudo()
  }
  
  ngOnInit() {
  }

  protected inicializarConteudo(): void {
    this.listaTodosCanais = this.canalService.buscarTodosCanais().slice()
    this.nomeCanaisBusca = this.resgatarNomeCanaisBusca(this.listaTodosCanais)

    this.listaTodasTurmas = this.turmaService.buscarTodosTurmas().slice()
    this.listaTurmasBusca = this.listaTodasTurmas.slice()
    this.nomeTurmasBusca = this.resgatarNomeTurmasBusca(this.listaTodasTurmas)
  }
  
  inicializarForms() {
    this.inicializarFormAviso()
  }

  inicializarFormAviso() {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      prioridade: ['', Validators.required],
      texto: ['', Validators.required],
      canal: ['', Validators.required],
      turmaBusca: ['', Validators.required],
      dataLembrete: ['']
    })
  }

  // ---- controle ---- //

  salvar(){
    if (this.form?.valid && this.canalDuvidas !== undefined){
      this.aviso.titulo = this.form.value.titulo
      this.aviso.texto = this.form.value.texto
      this.aviso.prioridade = this.form.value.prioridade
      this.aviso.idCanal = this.canalDuvidas.idCanal
      this.listaTurmasTabela.forEach((turma) => {
        this.aviso.idTurmas.push(turma.idTurma)
      })
      this.avisoService.incluirAviso(this.aviso)

      if (this.form.value.dataLembrete !== ''){
        var lembrete: Lembrete = lembreteVazio()
        lembrete.idAviso = this.aviso.idAviso
        lembrete.titulo = 'Lembrete: ' + this.aviso.titulo
        lembrete.texto = this.aviso.texto.substring(0, 50)
        lembrete.dataLembrete = this.form.value.dataLembrete
        
        this.lembreteService.incluirLembrete(lembrete)
      }

      this.navegarPara('')
    } else {
      this.form?.markAllAsTouched()
      // se tiver preenchido de alguma forma a lista entao nao precisa marcar
      if (this.listaTurmasTabela.length > 0) {
        this.form?.controls.turmaBusca.markAsUntouched()
      }
    }
  }

  cancelar(){
    this.navegarPara('')
  }
  
  // ---- controle ---- //

  // ---- prioridades ---- //

  opcoesPrioridade: FieldSelectOption[] = [
    {
      label: 'Baixa',
      value: ConstantesPrioridadesAvisos.BAIXA,
    },
    {
      label: 'Média',
      value: ConstantesPrioridadesAvisos.MEDIA,
    },
    {
      label: 'Alta',
      value: ConstantesPrioridadesAvisos.ALTA,
    },
  ];
  
  // ---- prioridades ---- //

  // ---- controle canal ---- //
  
  nomeCanaisBusca: string[] = []
  
  private resgatarNomeCanaisBusca(lista: Canal[]): string[] {
    var nomes: string[] = []
    lista.forEach(canal => {
      nomes.push(canal.nome)
    });
    return nomes
  }

  selecionarCanal(valor: number){
    if (valor !== -1) {
      const canal = this.listaTodosCanais[valor]
  
      this.form?.controls.canal.setValue(canal.nome)
      this.canalDuvidas = canal
    } else {
      this.form?.controls.canal.setValue('')
      this.canalDuvidas = undefined
    }
  }

  // ---- controle canal ---- //

  // ---- controle turmas ---- //
  
  listaTurmasBusca: Turma[] = []
  nomeTurmasBusca: string[] = []

  listaTurmasTabela: Turma[] = []

  private resgatarNomeTurmasBusca(lista: Turma[]): string[] {
    var nomes: string[] = []
    lista.forEach(turma => {
      nomes.push(turma.nome)
    });
    return nomes
  }

  adicionarTurma(valor: number) {
    if (valor !== -1) {
      const turma = this.listaTurmasBusca[valor]
  
      this.listaTurmasTabela.push(turma)
  
      this.removerTurmaDaListaBusca(valor)
    }
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

  deletarTurma(id: number) {
    const indexTurma = this.listaTurmasTabela.findIndex((t) => {
      return t.idTurma === id
    })
    if (indexTurma !== -1) {
      const turma = this.listaTurmasTabela[indexTurma]
      this.listaTurmasTabela.splice(indexTurma, 1)


      this.listaTurmasBusca.push(turma)
      this.nomeTurmasBusca.push(turma.nome)
    }
  }

  // ---- controle turmas ---- //


}
