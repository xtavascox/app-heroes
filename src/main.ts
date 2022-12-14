import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {enviroment} from "./environments/environment";
import {enableProdMode} from "@angular/core";

if (enviroment.production){
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
