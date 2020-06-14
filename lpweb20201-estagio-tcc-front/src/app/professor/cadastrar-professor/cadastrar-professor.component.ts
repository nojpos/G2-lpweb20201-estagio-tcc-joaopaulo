import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../professor.service';
import { Router } from '@angular/router';
import { CursoService } from 'src/app/curso/curso-service.service';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { ToastrService } from 'ngx-toastr';
import { ConfiguracaoAlert } from 'src/app/uteis/configuracao-alert';
import { Funcao } from 'src/app/uteis/funcao';

@Component({
  selector: 'app-cadastrar-professor',
  templateUrl: './cadastrar-professor.component.html',
  styleUrls: ['./cadastrar-professor.component.css']
})
export class CadastrarProfessorComponent implements OnInit {

  cadastroForm: FormGroup;

  professor: any;
  listaCurso: any;
  listaFuncionario: any;

  listaFuncao: Funcao[] = Funcao.listaFuncoes;

  constructor(private fb: FormBuilder,
    private router: Router,
    private professor$: ProfessorService,
    private curso$: CursoService,
    private funcionario$: FuncionarioService,
    private alert: ToastrService) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.obterCurso();
    this.obterFuncionario();
  }

  obterCurso() {
    this.curso$.lista()
      .subscribe((retorno: any) => this.listaCurso = retorno.results,
        error => this.alert.error(error.message, 'Erro ao obter lista de curso', { ...ConfiguracaoAlert.configuracaoPadrao }));
  }

  obterFuncionario() {
    this.funcionario$.lista()
      .subscribe((retorno: any) => this.listaFuncionario = retorno.results,
        error => this.alert.error(error.message, 'Erro ao obter lista de funcionários', { ...ConfiguracaoAlert.configuracaoPadrao }));
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      curso_id: ['', [Validators.required]],
      funcionario_id: ['', [Validators.required]],
      funcao: ['', [Validators.required]]
    });
  }

  salvar() {
    if (!this.cadastroForm.dirty || !this.cadastroForm.valid) {
      this.cadastroForm.markAllAsTouched();
      this.alert.warning('Corrija os erros informados nos campos para salvar o registro', 'Formulário inválido', { ...ConfiguracaoAlert.configuracaoPadrao })
      return
    }
    this.adicionar();
  }

  AtualizarDadosObjeto() {
    this.professor = Object.assign({}, this.professor, this.cadastroForm.value);
    console.log(this.professor);
  }

  adicionar() {
    this.AtualizarDadosObjeto()
    this.professor$.cadastrar(this.professor)
      .subscribe(
        (retorno: any) => {
          this.alert.success('Sucesso', `Professor(a) ${retorno.funcionario.nome} cadastrado(a) com sucesso`, { ...ConfiguracaoAlert.configuracaoPadrao })
          console.log(retorno)
          this.router.navigate(['/inicio/professores']);
        },
        error => this.alert.error(error.message, 'Erro ao obter lista de funcionários', { ...ConfiguracaoAlert.configuracaoPadrao }))
  }
}
