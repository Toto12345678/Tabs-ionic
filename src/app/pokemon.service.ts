import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  API : string = 'http://127.0.0.1:3333'
  id : string = ''
  constructor(
    private http : HttpClient
  ) { }

  getAll() : Observable<any>{
    return this.http.get(`${this.API}/pokemons`)
  }

  getById(id : string) : Observable<any>{
    return this.http.get(`${this.API}/pokemon/${id}`)
  }

  create(item:any) : Observable<any>{
    return this.http.post(`${this.API}/pokemon/`, item)
  }

  update(item:any) : Observable<any>{
    return this.http.put(`${this.API}/pokemon/${item.id}`, item)
  }
  
  delete(id : string) : Observable<any>{
    return this.http.delete(`${this.API}/pokemon/${id}`)
  }
}
