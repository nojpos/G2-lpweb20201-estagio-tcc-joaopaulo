import { Component, OnInit } from '@angular/core';
import { ProfessorService } from './professor.service';
import { ToastrService } from 'ngx-toastr';

import { ConfiguracaoAlert } from 'src/app/uteis/configuracao-alert';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  professores: any;

  constructor(private professor$: ProfessorService, private alert: ToastrService) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {
    this.professor$.lista()
      .subscribe((retorno: any) => {
        this.professores = retorno.results;
      },
      error => this.alert.error(error.message, 'Erro ao obter lista de professores', { ... ConfiguracaoAlert.configuracaoPadrao}));
  }

  excluir(id: number) {
    console.log(id);
    this.professor$.excluir(id)
      .subscribe(() => {
        this.alert.info('O cadastro foi excluído', 'Informação', { ... ConfiguracaoAlert.configuracaoPadrao})
        this.pesquisar()
      },
        error => this.alert.error(error.message, 'Erro ao excluir professor', { ... ConfiguracaoAlert.configuracaoPadrao}));
  }
}
