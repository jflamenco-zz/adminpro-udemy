import { Component, OnInit, inject } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public subirArchivoSrv: SubirArchivoService,
    public modalUploadSrv: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo se permiten imagenes', 'no es un tipo valido', 'error');
      this.imagenSubir = null;
    }
    this.imagenSubir = archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this.modalUploadSrv.ocultarModal();
  }

  subirImagen() {

    this.subirArchivoSrv.subirArchivo( this.imagenSubir, this.modalUploadSrv.tipo, this.modalUploadSrv.id )
        .then( resp => {

          this.modalUploadSrv.notificacion.emit( resp );
          this.cerrarModal();


        })
        .catch( err => console.log('Ha ocurrido un error al cargar la imagen', err));
  }

}
