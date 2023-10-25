import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { Aluno, Canal } from '../../../../shared/utilities/entidade/entidade.utility';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';

@Component({
  selector: 'app-mensagem-selecao-aluno',
  templateUrl: './mensagem-selecao-aluno.page.html',
  styleUrls: ['./mensagem-selecao-aluno.page.scss'],
})
export class MensagemSelecaoAlunoPage extends Pagina implements OnInit {

  canal!: Canal
  listaTodosAlunos!: Aluno[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
    private alunoService: AlunoService,
  ) {
    const ROTA_BASE = ConstantesRotas.ROTA_APP + ConstantesRotas.ROTA_MENSAGEM
    super(router, ROTA_BASE)

    this.inicializarConteudo()

  }

  ngOnInit() {
  }

  protected inicializarConteudo(): void {
    this.listaTodosAlunos = this.alunoService.buscarTodosAlunos()

    const id = this.activatedRoute.snapshot.paramMap.get('idCanal')
    if (id !== null) {
      this.canal = this.resgatarCanal(Number.parseInt(id))
    } else {
      throw new Error('idCanal nao especificado na url')
    }
  }

  private resgatarCanal(id: number): Canal {
    const responsavel = this.canalService.buscarCanal(id)
    if (responsavel !== undefined) {
      return responsavel
    }
    throw new Error('Canal nao encontrado')
  }

  navegarParaCanalResponsavel(idResponsavel: number) {
    var rota

    const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(this.canal.idCanal, idResponsavel)
    if (idCanalResponsavel !== undefined) {
      rota = idCanalResponsavel.toString() + ConstantesRotas.ROTA_MENSAGEM_CANAL
    } else {
      throw new Error('Canal Responsavel nao encontrado')
    }
    
    this.navegarPara(rota)
  }

}
