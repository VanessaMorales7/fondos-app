import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/enviroment';
import { Fondo } from '../models/fondo.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FondosService {

  private apiUrl = `${environment.apiUrl}/fondos`;
  private fondosSubject = new BehaviorSubject<Fondo[]>([]);
  fondos$ = this.fondosSubject.asObservable();

  constructor(private readonly http: HttpClient) {  }


  cargarFondos() {
    return this.http.get<Fondo[]>(this.apiUrl).pipe(
      tap(fondos => this.fondosSubject.next(fondos))
    );
  }
}
