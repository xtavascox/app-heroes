import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Heroe} from "../../interfaces/heroes.interface";
import {switchMap, tap} from "rxjs";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  hero!: Heroe;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly heroService: HeroesService,
              private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.heroService.getHeroePorId(id)),
        tap(console.log)
      )

      .subscribe({
        next: (heroe) => this.hero = heroe,
        error: (err) => console.log(err)
      });
  }

  handleBack() {
    this.router.navigate(['/heroes/listado']);
  }

}
