import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:5000';
  //private urlB = 'https://localhost:44326/'
  //create functions for http requests
  UserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/api/user`)
  }



  Login(email: string): Observable<User> {
    //I just get the user and send it back
    return this.http.get<User>(`${this.url}/Login/${email}`)
  }

  Register(user: User): Observable<User> {
 
    console.log('Making call to controller:')
    console.log(user);
    return this.http.post<User>(`${this.url}/Register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
       
    })
      .pipe(catchError(this.handleError<User>('register User', user)));
  }

    private handleError<T>(operation:string, result?:T) {
      return (error: any): Observable<T> => {
        console.error(error);
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
  }
       
    
      
  

  



  
  
}//eoc
