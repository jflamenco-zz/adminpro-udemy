import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';


import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public userSrv: UsuarioService
  ) {
    this.usuario = this.userSrv.usuario;
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    if ( !usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this.userSrv.actualizarUsuario( this.usuario )
    .subscribe();

  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Solo se permiten imagenes', 'no es un tipo valido', 'error');
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this.userSrv.cambiarImagen( this.imagenSubir, this.usuario._id );

  }

}
