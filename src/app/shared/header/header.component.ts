import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  usuario: Usuario;

  constructor(
    public userSrv: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this.userSrv.usuario;
  }

}
