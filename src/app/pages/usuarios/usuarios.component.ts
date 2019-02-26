import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

// import swal from 'sweetalert';
import { subscribeOn } from 'rxjs/operators';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  currentUser: Usuario;
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegs: number = 0;

  cargando: boolean;

  roles: any[] = [{
    name: 'ADMIN_ROLE',
    value: 'ADMIN_ROLE'
  },
    {
      name: 'USER_ROLE',
      value: 'USER_ROLE'
    }
  ];

  constructor(
    public userServ: UsuarioService,
    public modalUploadSrv: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.currentUser = this.userServ.usuario;
    this.modalUploadSrv.notificacion
        .subscribe( resp => this.cargarUsuarios() );
  }

  cargarUsuarios() {

    this.cargando = true;

    this.userServ.cargarUsuarios( this.desde )
    .subscribe( (resp: any) => {
      this.usuarios = resp.usuarios;
      this.totalRegs = resp.total;
      this.cargando = false;
    });

  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegs ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {

    if ( termino === '' ) {
        this.cargarUsuarios();
        return;
    }

    this.userServ.buscarUsuarios( termino )
        .subscribe( (usuarios: Usuario[]) => {
            this.usuarios = usuarios;
            this.totalRegs = usuarios.length;
        });
  }

  borrarUsuario( usuario: Usuario ) {

    if ( usuario._id === this.userServ.usuario._id ) {
      swal('No se puede borrar', 'Usted esta intentado borrarse a ud. mismo', 'danger');
      return;
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log( borrar );

      if ( borrar ) {
          this.userServ.borrarUsuario( usuario._id )
          .subscribe( resp => {
            if ( resp ) {
              this.cargarUsuarios();
            }
          });
      }
    });

  }

  guardarUsuario( usuario: Usuario ) {

    this.userServ.actualizarUsuario( usuario )
    .subscribe();

  }

  cambiarImagen( id: string ) {

    this.modalUploadSrv.mostrarModal( 'usuarios', id );

  }


}
