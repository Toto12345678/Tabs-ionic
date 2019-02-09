import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokemons : any

  constructor(
    private api : PokemonService
  ) { 
    this.api.getAll().subscribe(response =>{
      console.log(response);
      this.pokemons = response;
    }, error =>{
      console.log(error)
    })
  }
}
