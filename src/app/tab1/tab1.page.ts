import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IFilme } from '../models/iFilme.model';
import { IFilmeApi, IListaFilmes } from '../models/IFilmeAPI.model';
import { IGenero } from '../models/IGenero.model';
import { DadosService } from '../services/dados.service';
import { FilmeService } from '../services/filme.service';
import { GeneroService } from '../services/genero.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})


export class Tab1Page implements OnInit{

  titulo = 'Filmes';

  listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat (2021)',
      lancamento: '15/04/2021',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg',
      generos: ['Ação', 'Fantasia', 'Aventura'],
      pagina: '/mortal-kombat'
    },
    {
      nome: 'Falcão e o Soldado Invernal',
      lancamento: '12/05/2021',
      duracao: '50m',
      classificacao: 78,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/oF9njYCN6lBdrsi6wfulcxTggvn.jpg',
      generos: ['Ficção', 'Ação', 'Aventura', 'Guerra', 'Política'],
      pagina: '/falcao-e-o-soldado-invernal'
    },
    {
      nome: 'O Conto da Aia (2017)',
      lancamento: '10/03/2017',
      duracao: '50m',
      classificacao: 82,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/2rK53k6Lg6IDqHM7xp8OTzzzpz7.jpg',
      generos: ['Ficção', 'Drama'],
      pagina: '/o-conto-da-aia'
    },
    {
      nome: 'Quem Matou Sara? (2021)',
      lancamento: '12/05/2021',
      duracao: '40m',
      classificacao: 78,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/5BYyTmEqkYXIgdDPyEiAeAbhIsI.jpg',
      generos: ['Drama', 'Crime', 'Mistério'],
      pagina: '/quem-matou-sara'
    },
    {
      nome: 'A Rainha do Fluxo',
      lancamento: '12/06/2018',
      duracao: '53m',
      classificacao: 80,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/fuVuDYrs8sxvEolnYr0wCSvtyTi.jpg',
      generos: ['Drama'],
      pagina: '/a-rainha-do-fluxo'
    }
  ];


  listaFilmes: IListaFilmes;

  generos: string[] = [];

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    public dadosService: DadosService,
    public filmeService: FilmeService,
    public generoService: GeneroService,
    public route: Router) { }


    buscarFilmes(evento: any){
      console.log(evento.target.value);
      const busca = evento.target.value;
      if(busca && busca.trim() !== ''){
        this.filmeService.buscarFilmes(busca).subscribe(dados=>{
          console.log(dados);
          this.listaFilmes = dados;
        });
      }
    }

    exibirFilme(filme: IFilmeApi){
      this.dadosService.guardarDados('filme', filme);
      this.route.navigateByUrl('/dados-filme');
    }

  async exibirAlertaFavorito() {
    const alert = await this.alertController.create({
      header: 'Alerta!',
      message: 'Deseja realmente favoritar o filme?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, favoritar',
          handler: () => {
            this.apresentarToast();
          }
        }
      ]
    });

    await alert.present();
  }


  async apresentarToast() {
    const toast = await this.toastController.create({
      message: 'Filme adicionado aos favoritos.',
      duration: 2000,
      color: 'success',
      position: 'middle'
    });
    toast.present();
  }

  ngOnInit(){
    this.generoService.buscarGeneros().subscribe(dados => {
      console.log('Generos: ', dados.genres);
      dados.genres.forEach(genero => {
        this.generos[genero.id] = genero.name;
      });
    });
  }
}
