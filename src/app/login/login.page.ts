import { core } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public toastController: ToastController, private route: Router) { }

  email: string;
  senha: string;

  async presentToast(texto: string, cor: string) {
    const toast = await this.toastController.create({
      message: texto,
      color: cor,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

  login(){
    if(this.email === 'admin@admin.com' && this.senha === 'admin'){
      this.route.navigateByUrl('/tabs/tab1');
      this.presentToast('Seja bem vindo!', 'sucess');
    }else{
      this.presentToast('Erro! Usuário ou Senha inválido!', 'danger');
    }
  }

}
