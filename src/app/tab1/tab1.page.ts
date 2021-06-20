import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { IFilme } from '../models/iFilme.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  titulo = 'Videos App';

  listaVideos: IFilme[] = [
    {
      nome: 'Mortal Kombat (2021)',
      lancamento: '15/04/2021',
      duracao: '1h 50m',
      classificacao: 76,
      cartaz: 'https://www.themoviedb.org/t/p/w220_and_h330_face/w8BVC3qrCWCiTHRz4Rft12dtQF0.jpg',
      generos:['Ação', 'Fantasia', 'Aventura']
    },
    {
      nome:'Quem Matou Sara? (2021)',
      lancamento:'12/05/2021',
      duracao:'40m',
      classificacao: 78,
      cartaz:'https://www.themoviedb.org/t/p/w220_and_h330_face/5BYyTmEqkYXIgdDPyEiAeAbhIsI.jpg',
      generos:['Drama', 'Crime', 'Mistério']
    }
  ];

  constructor(public alertController: AlertController, public toastController: ToastController) {}

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
      position:'middle'
    });
    toast.present();
  }
}
