import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;


  auth2: any;

  constructor(
    public router: Router,
    public userSrv: UsuarioService,
    private ngZOne: NgZone
  ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
      this.recuerdame = true;
    }

    this.googleInit();
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '702480247330-oohunb8phanlg5svmnek44h6m6uri8nv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btnGoogle'));

    });

  }

  attachSingin( elementHtml ) {
    this.auth2.attachClickHandler( elementHtml, {}, (googleUser) => {

    let token = googleUser.getAuthResponse().id_token;

    // console.log(token);

    this.userSrv.loginGogle( token )
    .subscribe( () => {
      this.router.navigate(['/dashboard']);
    });

    });
  }


  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );

    this.userSrv.login(usuario, forma.value.recuerdame )
    .subscribe( resp => {
      this.ngZOne.run(() =>
        this.router.navigateByUrl('#/dashboard'));
    });


  }

}
