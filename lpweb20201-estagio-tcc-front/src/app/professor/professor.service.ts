import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  constructor(private http: HttpClient, private auth$: AuthService) { }

  lista() {
    return this.http.get(environment.API_URL.concat('professores/'), this.auth$.httpOptions());
  }

  cadastrar(professor: any) {
    return this.http.post(environment.API_URL.concat('professores/'), professor, this.auth$.httpOptions());
  }

  excluir(id: number) {
    return this.http.delete(environment.API_URL.concat(`professores/${id}/`), this.auth$.httpOptions());
  }
}
