import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { ToastController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IListaSeries } from '../models/ISerieAPI.model';

@Injectable({
  providedIn: 'root'
})
export class SerieService {

  lingua = 'pt-BR';
  regiao = 'BR';


  private apiURL = 'https://api.themoviedb.org/3/';
  private apiKey = '?api_key=98d8457581acf2a3565a1e67b38f486a';



  constructor(
    private http: HttpClient,
    public toastController: ToastController) { }

  buscarSeries(busca: string): Observable<IListaSeries> {
    const url = `${this.apiURL}search/tv${this.apiKey}&language=${this.lingua}&&query=${busca}`;
    return this.http.get<IListaSeries>(url).pipe(
      map(retorno => retorno),
      catchError(erro => this.exibirErro(erro))
    );
  }

  async exibirErro(erro) {
    const toast = await this.toastController.create({
      message: 'Erro ao consultar a API',
      duration: 2000,
      color: 'danger',
      position: 'middle'
    });
    toast.present();
    return null;
  }
}


