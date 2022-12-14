import {Component, OnInit} from '@angular/core';
import {Heroe, Publisher} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmarComponent} from "../../components/confirmar/confirmar.component";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['agregar.component.css']
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC-Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel-Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: ''
  };

  constructor(
    private readonly heroesService: HeroesService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params.pipe(
        switchMap(({id}) => this.heroesService.getHeroePorId(id))
      ).subscribe((heroe) => this.heroe = heroe);
    }


  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe).subscribe({
        next: (resp) => {
          this.mostrarSnackBar('Se actualizo correctamente')
        },
        error: (err) => console.log(err)
      });

    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe({
        next: (heroe) => {
          this.mostrarSnackBar('Se creo correctamente')
          this.router.navigate(['/heroes/detalle', heroe.id])
        },
        error: (err) => console.log(err)
      });

    }
  }


  borrar() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });
    dialog.afterClosed().subscribe((result) => {
      if(result){

        this.heroesService.borrarHeroe(this.heroe.id!).subscribe({
          next: () => {
            this.router.navigate(['/heroes'])
          }
        });

      }
    });
  }

  mostrarSnackBar(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2500
    })
  }

}
