import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import {HerosRoutingModule} from "./heros-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MaterialModule} from "../material/material.module";
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import {FormsModule} from "@angular/forms";
import { ConfirmarComponent } from './components/confirmar/confirmar.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HeroeComponent,
    HomeComponent,
    ListadoComponent,
    HeroCardComponent,
    ImagenPipe,
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HerosRoutingModule,
    MaterialModule
  ]
})
export class HeroesModule { }
