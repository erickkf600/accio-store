import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController  } from 'ionic-angular';
//Importando a API do Woocommerce
import * as WC from 'woocommerce-api';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  WooCommerce: any;
  products: any[];
  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.WooCommerce = WC({
      url:"http://accio-estoque.epizy.com",
      consumerKey: "ck_476bbb2a6bb9eb85afdfd8ced49bdc58fd086817",
      consumerSecret: "cs_a9a4ac980716241180c439b937d2be4aec8aa461",
      wpAPI: true,
      version: "wc/v2",
      queryStringAuth: true
    });
    this.WooCommerce.getAsync("products").then( (data) =>{
      console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
    }, (err)=>{
      let alert = this.alertCtrl.create({
        title: 'ERRO DE CONEXÃO',
        subTitle: 'Por favor, cheque sua internet e tente novamente',
        buttons: ['OK']
      });
      alert.present();
    })
  }

}
