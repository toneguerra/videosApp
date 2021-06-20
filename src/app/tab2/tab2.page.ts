import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IListaSeries, ISerieApi } from '../models/ISerieAPI.model';
import { DadosService } from '../services/dados.service';
import { GeneroService } from '../services/genero.service';
import { SerieService } from '../services/serie.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  titulo = 'Series';

  listaSeries: IListaSeries;

  generos: string[] = [];

  constructor(
    public toastController: ToastController,
    public serieService: SerieService,
    public generoService: GeneroService,
    public dadosService: DadosService,
    public route: Router
  ) {}

  buscarSeries(evento: any){
    console.log(evento.target.value);
    const busca = evento.target.value;
    if(busca && busca.trim() !== ''){
      this.serieService.buscarSeries(busca).subscribe(dados=>{
        console.log(dados);
        this.listaSeries = dados;
      });
    }
  }

  exibirSerie(serie: ISerieApi){
    this.dadosService.guardarDados('serie', serie);
    this.route.navigateByUrl('/dados-serie');
  }

  ngOnInit(){
    this.generoService.buscarGeneros().subscribe(dados => {
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });

      this.dadosService.guardarDados('generos', this.generos);
    });
  }

}
