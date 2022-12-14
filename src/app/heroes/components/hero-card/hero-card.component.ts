import {Component, Input} from '@angular/core';
import {Heroe} from "../../interfaces/heroes.interface";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent {
@Input()hero!:Heroe
}
