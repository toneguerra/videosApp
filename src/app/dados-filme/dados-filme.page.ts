import { Component, OnInit } from '@angular/core';
//import { IFilme } from '../models/iFilme.model';
import { IFilmeApi } from '../models/IFilmeAPI.model';
import { DadosService } from '../services/dados.service';

@Component({
  selector: 'app-dados-filme',
  templateUrl: './dados-filme.page.html',
  styleUrls: ['./dados-filme.page.scss'],
})
export class DadosFilmePage implements OnInit {
  //filme: IFilme;
  filme: IFilmeApi;

  generos: string[] = [];

  constructor(
    public dadosService: DadosService
  ) { }

  ngOnInit() {
    this.filme = this.dadosService.pegarDados('filme');
    this.generos = this.dadosService.pegarDados('generos');
    console.log('filme enviado', this.filme );


  }

}
