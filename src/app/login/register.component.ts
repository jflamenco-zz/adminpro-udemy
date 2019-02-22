import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public userSrv: UsuarioService,
    public router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ) {
    return (group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }


  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email ]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales( 'password', 'password2' ) });

    this.forma.setValue({
      nombre: 'Test ',
      email: 'test@test.com',
      password: '12345',
      password2: '12345',
      condiciones: false
    });



  }

  registrarUsuario() {

    if ( this.forma.invalid ) {
      return;
    }

    if (!this.forma.value.condiciones ) {
      swal('Importante', 'Debe aceptar las condiciones de uso.', 'warning');
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.userSrv.crearUsuario( usuario )
    .subscribe( resp =>
      this.router.navigate(['/login'])
    );

  }

}
