import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalListComponent } from '../modal-list/modal-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modal : ModalController,
    private router : Router
  ) { }

  ngOnInit() {
  }
  
  async openModal() {
    const mo = await this.modal.create({
      component: ModalListComponent,
      cssClass: 'toto'
    })
    await mo.present();
  }

}
