import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


    this.contarTres().then( () => console.log('Bingo'))
      .catch(error => console.error('Error no conc', error));
  }



  ngOnInit() {
  }

contarTres(): Promise<boolean> {

  // tslint:disable-next-line:prefer-const
    return new Promise((resolve, reject) => {

      let contador = 0;

      // tslint:disable-next-line:prefer-const
      let itervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve( true );
          clearInterval(itervalo);
        }

      }, 1000);
    });

  }


}
