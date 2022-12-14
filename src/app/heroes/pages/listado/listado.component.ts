import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {Heroe} from "../../interfaces/heroes.interface";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {
  heroList: Heroe[] = [];

  constructor(private readonly heroesService: HeroesService) {
  }

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe({
        next: heroes => {
          this.heroList = heroes;
        },
        error: err => console.log(err)
      });

  }


}
