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
      url:"http://localhost/ACCIO-STORE/",
      consumerKey: "ck_c44ae4f28cad1f59b33e0a1648a19e1431ddd0ae",
      consumerSecret: "cs_4703ff399dbb21c75460cbbea33b4a50f0aee464",
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
