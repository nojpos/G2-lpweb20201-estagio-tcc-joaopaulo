export class Funcao {
    
    constructor(descricao: string) {
        this.descricao = descricao;
    }

    descricao: string;

    
    static listaFuncoes = [
        new Funcao('coordenador'),
        new Funcao('coordenador-estagio-tcc'),
        new Funcao('professor')
    ]
}