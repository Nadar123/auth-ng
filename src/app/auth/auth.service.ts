import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { URL } from 'src/environments/environment';

interface UsernameAvailableRes {
  available: boolean;
}

interface SignupFormValues {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }
  
  userAvailable (username: string) {
    return this.http.post<UsernameAvailableRes>(
      URL.API_URL + '/auth/username', 
      { username }
    )
  }

  signup(formValues: SignupFormValues) {
    return this.http.post<SignupFormValues>(
      URL.API_URL + 'auth/signup',
      formValues
    );
  }

}
