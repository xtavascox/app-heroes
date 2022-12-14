import {Component} from '@angular/core';
import {Heroe} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private readonly heroesService: HeroesService) {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino).subscribe({
      next: (heroes) => this.heroes = heroes
    })
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value
    this.termino = heroe.superhero;

    this.heroesService.getHeroePorId(heroe.id!).subscribe({
      next: heroe => this.heroeSeleccionado = heroe,
      error: err => console.log(err)
    })
  }
}
