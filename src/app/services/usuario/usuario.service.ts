import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_API } from '../../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {}

  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_API + '/login';
    return this.http.post( url, usuario )
     .pipe(map( (resp: any) => {

        localStorage.setItem( 'id', resp.id );
        localStorage.setItem('token', resp.token);
        localStorage.setItem('usuario', JSON.stringify( resp.usuario ));

        return resp.usuario;
     }))
    ;

  }

  crearUsuario( usuario: Usuario ) {
     let url = `${ URL_API }/usuario`;

     return this.http.post(url, usuario )
     .pipe(map((resp: any) => {
       swal('Usuario creado', usuario.email, 'success');
       return resp.usuario;

     }));
  }


}
