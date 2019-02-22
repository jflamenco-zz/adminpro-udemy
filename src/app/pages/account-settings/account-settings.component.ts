import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    @Inject(DOCUMENT) private documentR,
    public ajustes: SettingsService
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema: string ) {
    this.ajustes.aplicarTema(tema);
    this.colocarCheck();
  }

  colocarCheck() {
    // tslint:disable-next-line:prefer-const
    let selectores: any = document.getElementsByClassName('selector');

    // tslint:disable-next-line:prefer-const
    for (let ref of selectores) {
      if ( ref.getAttribute('data-theme') === this.ajustes.ajustes.tema ) {
        ref.classList.add('working');
      } else {
        ref.classList.remove('working');
      }
    }

  }

}
