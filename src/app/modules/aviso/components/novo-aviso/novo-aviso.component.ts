import { SharedModule } from '../../../../shared/shared.module';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  ConstantesPrioridadesAvisos,
  ConstantesRotas,
} from '../../../../shared/utilities/constantes/constantes.utility';
import { FieldSelectOption } from '../../../../shared/components/field-select/field-select.interface';
import { CanalService } from '../../../../core/state/gerenciamento/canal/canal.service';
import { TurmaService } from '../../../../core/state/gerenciamento/turma/turma.service';
import { AvisoService } from '../../../../core/state/aviso/aviso-service/aviso.service';
import { LembreteService } from '../../../../core/services/lembrete-service/lembrete.service';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Aviso } from '../../../../core/state/aviso/aviso-service/aviso.entity';
import { Canal } from '../../../../core/state/gerenciamento/canal/canal.entity';
import { Turma } from '../../../../core/state/gerenciamento/turma/turma.entity';
import { Lembrete } from '../../../../core/services/lembrete-service/lembrete.entity';
import { GerenciamentoRepository } from '../../../../core/state/gerenciamento/gerenciamento.repository';

@Component({
  selector: 'app-novo-aviso',
  templateUrl: './novo-aviso.component.html',
  styleUrls: ['./novo-aviso.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class NovoAvisoComponent implements OnInit {
  aviso: Aviso = new Aviso();
  form: UntypedFormGroup | undefined;
  listaTodosCanais: Canal[] = [];
  listaTodasTurmas: Turma[] = [];
  canalDuvidas?: Canal;
  prioridadeAviso?: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private modalController: ModalController,
    private lembreteService: LembreteService,
    private canalService: CanalService,
    private turmaService: TurmaService,
    private gerenciamentoRepository: GerenciamentoRepository
  ) {
    this.inicializarForms();
    this.inicializarConteudo();
  }

  ngOnInit() {}

  protected inicializarConteudo(): void {
    this.canalService.buscarTodosCanais().subscribe({
      next: () => {
        const canais = this.gerenciamentoRepository.canais();

        this.listaTodosCanais = [];
        if (canais !== undefined) {
          canais.forEach((canal) => {
            this.listaTodosCanais.push(new Canal(canal));
          });
        }
        this.resgatarNomeCanaisBusca(this.listaTodosCanais);
      },
    });
    this.turmaService.buscarTodosTurmas().subscribe({
      next: () => {
        const turmas = this.gerenciamentoRepository.turmas();

        this.listaTodasTurmas = [];
        if (turmas !== undefined) {
          turmas.forEach((turma) => {
            this.listaTodasTurmas.push(new Turma(turma));
          });
        }
        this.resgatarNomeTurmasBusca(this.listaTodasTurmas);
        this.listaTurmasBusca = this.listaTodasTurmas.slice();
      },
    });
    this.nomePrioridadesBusca = this.resgatarNomePrioridadesBusca();
  }

  inicializarForms() {
    this.inicializarFormAviso();
  }

  inicializarFormAviso() {
    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      prioridade: ['', Validators.required],
      texto: ['', Validators.required],
      canal: ['', Validators.required],
      turmaBusca: ['', Validators.required],
      dataLembrete: [''],
    });
  }

  // ---- controle ---- //

  salvar() {
    if (this.form?.valid && this.canalDuvidas !== undefined && this.prioridadeAviso !== undefined) {
      this.aviso.titulo = this.form.value.titulo;
      this.aviso.texto = this.form.value.texto;
      this.aviso.prioridade = this.prioridadeAviso;
      this.aviso.canal = this.canalDuvidas;
      this.listaTurmasTabela.forEach((turma) => {
        this.aviso.turmas.push(turma);
      });

      if (this.form.value.dataLembrete !== '') {
        var lembrete: Lembrete = new Lembrete();
        lembrete.aviso = this.aviso;
        lembrete.titulo = 'Lembrete: ' + this.aviso.titulo;
        lembrete.texto = this.aviso.texto.substring(0, 50);
        lembrete.data_lembrete = this.form.value.dataLembrete;

        // this.lembreteService.incluirLembrete(lembrete)
      }

      return this.modalController.dismiss(this.aviso, 'salvarAviso');
    } else {
      this.form?.markAllAsTouched();
      // se tiver preenchido de alguma forma a lista entao nao precisa marcar
      if (this.listaTurmasTabela.length > 0) {
        this.form?.controls.turmaBusca.markAsUntouched();
      }
    }
  }

  cancelar() {
    return this.modalController.dismiss(undefined, 'cancelarAviso');
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

  nomePrioridadesBusca: string[] = [];

  private resgatarNomePrioridadesBusca(): string[] {
    var nomes: string[] = [];
    this.opcoesPrioridade.forEach((prioridade) => {
      nomes.push(prioridade.label);
    });
    return nomes;
  }

  selecionarPrioridade(valor: number) {
    if (valor !== -1) {
      const prioridade = this.opcoesPrioridade[valor];

      this.form?.controls.prioridade.setValue(prioridade.label);
      if (typeof prioridade.value === 'string') {
        this.prioridadeAviso = prioridade.value;
      }
    } else {
      this.form?.controls.prioridade.setValue('');
      this.prioridadeAviso = undefined;
    }
  }

  // ---- prioridades ---- //

  // ---- controle canal ---- //

  nomeCanaisBusca: string[] = [];

  private resgatarNomeCanaisBusca(lista: Canal[]) {
    this.nomeCanaisBusca.splice(0, this.nomeCanaisBusca.length);
    lista.forEach((canal) => {
      this.nomeCanaisBusca.push(canal.nome);
    });
  }

  selecionarCanal(valor: number) {
    if (valor !== -1) {
      const canal = this.listaTodosCanais[valor];

      this.form?.controls.canal.setValue(canal.nome);
      this.canalDuvidas = canal;
    } else {
      this.form?.controls.canal.setValue('');
      this.canalDuvidas = undefined;
    }
  }

  // ---- controle canal ---- //

  // ---- controle turmas ---- //

  listaTurmasBusca: Turma[] = [];
  nomeTurmasBusca: string[] = [];

  listaTurmasTabela: Turma[] = [];

  private resgatarNomeTurmasBusca(lista: Turma[]) {
    this.nomeTurmasBusca.splice(0, this.nomeTurmasBusca.length);
    lista.forEach((turma) => {
      this.nomeTurmasBusca.push(turma.nome);
    });
  }

  adicionarTurma(valor: number) {
    console.log(valor);
    if (valor !== -1) {
      const turma = this.listaTurmasBusca[valor];
      console.log(turma);

      this.listaTurmasTabela.push(turma);

      this.removerTurmaDaListaBusca(valor);
    }
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

  deletarTurma(id: string) {
    const indexTurma = this.listaTurmasTabela.findIndex((t) => {
      return t.turma_id === id;
    });
    if (indexTurma !== -1) {
      const turma = this.listaTurmasTabela[indexTurma];
      this.listaTurmasTabela.splice(indexTurma, 1);

      this.listaTurmasBusca.push(turma);
      this.nomeTurmasBusca.push(turma.nome);
    }
  }

  // ---- controle turmas ---- //
}
