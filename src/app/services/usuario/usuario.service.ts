import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirArchivoSrv: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  isLogged() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem( 'usuario' ));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuario ) {


    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

  }

  loginGogle( token: string ) {

    let url = URL_API + '/login/google';

    return this.http.post( url, { token } )
      .pipe(map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_API + '/login';
    return this.http.post( url, usuario )
     .pipe(map( (resp: any) => {

        this.guardarStorage( resp.id, resp.token, resp.usuario );
        return true;
     }))
    ;

  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  crearUsuario( usuario: Usuario ) {
     let url = `${ URL_API }/usuario`;

     return this.http.post(url, usuario )
     .pipe(map((resp: any) => {
       swal('Usuario creado', usuario.email, 'success');
       return resp.usuario;

     }));
  }

  borrarUsuario( id: string ) {

    let url = URL_API + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url)
    .pipe(map(resp => {
      swal('Usuario borrado', 'El usuario ha sido eliminado', 'success');
      return true;
    }));

  }

  actualizarUsuario( usuario: Usuario ) {

    let url = URL_API + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map( (resp: any) => {

        if ( usuario._id === this.usuario._id ) {
          let usuarioDb: Usuario = resp.usuario;
          this.guardarStorage( usuarioDb._id, this.token, usuarioDb);
        }
        swal('Usuario Actualizado', usuario.nombre, 'success');
      }));

  }

  cambiarImagen( archivo: File, id: string ) {

    this.subirArchivoSrv.subirArchivo( archivo, 'usuarios', id  )
      .then( (resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');

        this.guardarStorage( id, this.token, this.usuario );

      })
      .catch( resp => {
        console.log(resp);
      });

  }

  cargarUsuarios( desde: number = 0 ) {

    let url = URL_API + '/usuario?desde=' + desde;

    return this.http.get(url);

  }

  buscarUsuarios( termino: string ) {

    let url = URL_API + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url )
    .pipe( map( (resp: any ) => resp.usuarios));

  }


}
