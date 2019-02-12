import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private documentK ) {
     this.cargarAjustes();
  }

  guardarAjuste() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema( tema: string ) {

    // tslint:disable-next-line:prefer-const
    let url = `assets/css/colors/${ tema }.css`;
    this.documentK.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjuste();

  }

}


interface Ajustes {
  temaUrl: string;
  tema: string;
}
