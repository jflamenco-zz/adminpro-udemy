import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;


  constructor(
    public sideBarServ: SidebarService,
    public userSrv: UsuarioService
    ) {
  }

  ngOnInit() {
    this.usuario = this.userSrv.usuario;
  }

}
