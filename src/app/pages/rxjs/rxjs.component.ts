import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

    this.subscripcion = this.regresaObservable()
      .subscribe(
        numero => console.log('subs', numero),
        error => console.error('Error: ', error),
        () => console.log('Success')
      );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscripcion.unsubscribe();
    console.log('la pagina se va cerrar');
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {


      let contador = 0;

      let intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

     /*    if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */

     /*    if (contador === 2) {
          clearInterval(intervalo);
          observer.error('Ha ocurrido un error');
        } */


      }, 1000);

    }).pipe(
      map( resp => resp.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      })
    );


  }

}
