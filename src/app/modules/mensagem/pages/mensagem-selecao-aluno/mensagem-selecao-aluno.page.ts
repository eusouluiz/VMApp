import { Component, OnInit } from '@angular/core';
import { Pagina } from '../../../../shared/utilities/pagina/pagina.utility';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantesRotas } from '../../../../shared/utilities/constantes/constantes.utility';
import { CanalService } from '../../../../core/services/canal-service/canal.service';
import { AlunoService } from '../../../../core/services/aluno-service/aluno.service';
import { MensagemService } from '../../../../core/services/mensagem-service/mensagem.service';
import { Canal } from '../../../../core/services/canal-service/canal.entity';
import { Aluno } from '../../../../core/services/aluno-service/aluno.entity';

interface ItemCanalResponsavel{
  nomeAluno: string,
  nomeResponsavel: string,
  idResponsavel: string,
}

@Component({
  selector: 'app-mensagem-selecao-aluno',
  templateUrl: './mensagem-selecao-aluno.page.html',
  styleUrls: ['./mensagem-selecao-aluno.page.scss'],
})
export class MensagemSelecaoAlunoPage extends Pagina implements OnInit {

  canal!: Canal
  listaTodosAlunos!: Aluno[]
  listaCanalResponsavel: ItemCanalResponsavel[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private canalService: CanalService,
    private alunoService: AlunoService,
    private mensagemService: MensagemService,
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
      this.canal = this.resgatarCanal(id)
    } else {
      throw new Error('idCanal nao especificado na url')
    }
    this.inicializarCanalResponsavel()
  }

  inicializarCanalResponsavel(){
    // esvaziar para encher
    this.listaCanalResponsavel = []
    this.listaTodosAlunos.forEach((a) => {
      if (a.responsaveis.length > 0) {
        a.responsaveis.forEach((r) => {
          this.listaCanalResponsavel.push({
            nomeAluno: a.nome,
            nomeResponsavel: r.usuario.nome,
            idResponsavel: r.responsavel_id
          })
        })
      }
    })
  }

  private resgatarCanal(id: string): Canal {
    const canal = this.canalService.buscarCanal(id)
    if (canal !== undefined) {
      return canal
    }
    throw new Error('Canal nao encontrado')
  }

  resgatarUltimaMensagem(idResponsavel: string): string {
    const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(this.canal.canal_id, idResponsavel)

    if (idCanalResponsavel !== undefined) {
      const mensagem = this.mensagemService.buscarUltimaMensagensCanalResponsavel(idCanalResponsavel)
      if (mensagem !== undefined){
        return 'Mensagem: ' + mensagem.texto
      } else {
        return ''
      }
    } else {
      return ''
    }
  }

  navegarParaCanalResponsavel(idResponsavel: string) {
    var rota

    const idCanalResponsavel = this.canalService.buscarIdCanalResponsavel(this.canal.canal_id, idResponsavel)
    if (idCanalResponsavel !== undefined) {
      rota = idCanalResponsavel.toString() + ConstantesRotas.ROTA_MENSAGEM_CANAL
    } else {
      throw new Error('Canal Responsavel nao encontrado')
    }

    this.navegarPara(rota)
  }

  filtrarCanalResponsavel(ev: any) {
    var val = ev.target.value;
    this.inicializarCanalResponsavel()

    // se o valor for um valor valido
    this.listaCanalResponsavel = this.listaCanalResponsavel.filter((canal) => {
      return (canal.nomeAluno.toLowerCase().indexOf(val.toLowerCase()) > -1) || (canal.nomeResponsavel.toLowerCase().indexOf(val.toLowerCase()) > -1);
    })
  }

}
