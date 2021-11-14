import { Component, NgZone } from '@angular/core';
import { akitaDevtools } from '@datorama/akita';
import { environment } from '../environments/environment';

@Component({
  selector: 'atenea-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  constructor(private ngZone: NgZone) {
    if (!environment.production) {
      akitaDevtools(ngZone, { name: 'Atenea' });
    }
  }
}
