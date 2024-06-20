import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = true;

  constructor() { }

  login(credentials: { email: string, password: string }): boolean {
    if(
      credentials.email == "singh@easypill.com"
      && credentials.password == "password"
    ){
      this.isAuthenticated = true;
    }
    
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }
}
