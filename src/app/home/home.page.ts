import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalListComponent } from '../modal-list/modal-list.component';
import { ModalNewComponent } from '../modal-new/modal-new.component';
import { DatabaseService } from '../database.service';
import { GetDataService } from '../get-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  list: any;
  txtStatus: string;
  cssStatus: string;
  
  constructor(
    private modal : ModalController,
    private router : Router,
    private sendData : GetDataService,
    private dbService : DatabaseService,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.dbService.getAllList().then( response => {
      console.log(response)
      this.list = response
    }).catch(e =>{
      console.log(e)
    })
  }

  getStatus(id) {
    if(id == 0){
      this.txtStatus = 'En proceso';
      this.cssStatus = 'enproceso';
    }else{
      this.txtStatus = 'Terminado';
      this.cssStatus = 'terminado';
    }
  }

  async openModal() {
    const mo = await this.modal.create({
      component: ModalListComponent,
      cssClass: 'toto'
    });
    mo.onDidDismiss().then((d: any) => 
      this.dbService.getAllList().then( response => {
        console.log(response)
        this.list = response
      }).catch(e =>{
        console.log(e)
      })
    );
    await mo.present();
  }
  async openEditModal(id: number) {
    const mo = await this.modal.create({
      component: ModalNewComponent,
      cssClass: 'toto',
      componentProps: { 
        id: id
      }
    });
    mo.onDidDismiss().then((d: any) => 
      this.dbService.getAllList().then( response => {
        console.log(response)
        this.list = response
      }).catch(e =>{
        console.log(e)
      })
    );
    await mo.present();
  }

  async openActionSheet(id:number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Editar',
        icon: 'create',
        handler: () => {
          this.openEditModal(id)
        }
      }, {
        text: 'Eliminar',
        icon: 'trash',
        role: 'destructive',
        handler: () => {
          this.dbService.deleteList(id).then( response => {
            console.log(response)
            this.list = response
          }).catch(e =>{
            console.log(e)
          })
          console.log('delete clicked');
          this.dbService.getAllList().then( response => {
            console.log(response)
            this.list = response
          }).catch(e =>{
            console.log(e)
          })
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          actionSheet.dismiss();
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  toDetails(id: number, name: string){
    this.sendData.param= id
    this.sendData.param2 = name
    this.router.navigate(['details', id])
  }

}
