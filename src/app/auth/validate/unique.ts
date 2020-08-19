import {AsyncValidator, FormControl} from '@angular/forms';
import {Injectable} from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {AuthService} from '../auth.service';

@Injectable({ 
  providedIn: 'root' 
})

export class Unique implements AsyncValidator {

  constructor(private authService: AuthService){}

  validate = (control: FormControl) => {
    const {value} = control;

    
    return this.authService.userAvailable(value).pipe(
      map(value => {
        if (value.available) {
          return null;
        }
      }),
      catchError(err => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
