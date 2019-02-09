import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { DatabaseService } from '../database.service';
import { GetDataService } from '../get-data.service';
import { ModalItemListComponent } from '../modal-item-list/modal-item-list.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  listId : number;
  titleList : string;
  list : any

  constructor(
    private modal : ModalController,
    private dbService : DatabaseService,
    public actionSheetController: ActionSheetController,
    private getData : GetDataService
  ) { }
  
  ngOnInit() {
    this.listId = this.getData.param
    this.titleList = this.getData.param2
    console.log(this.listId)
    this.fetchItems()
  }
// SELECT list.id,list.name,date,status,sum(price) total FROM list LEFT JOIN list_items ON list.id=list_id GROUP BY list.id
  fetchItems(){
    this.dbService.getAllItemsList(this.listId).then( response => {
      console.log(response)
      this.list = response
    }).catch(e =>{
      console.log(e)
    })
  }

  async openEditModal(id: number) {
    const mo = await this.modal.create({
      component: ModalItemListComponent,
      componentProps: { 
        id: id,
        idList : this.listId,
        create : 0
      }
    });
    mo.onDidDismiss().then((d: any) => 
      this.fetchItems()
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
          this.dbService.deleteItemList(id, this.listId).then( response => {
            console.log(response)
            this.list = response
          }).catch(e =>{
            console.log(e)
          })
          console.log('delete clicked');
          this.fetchItems()
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

  async createItem(){
    const mo = await this.modal.create({
      component: ModalItemListComponent,
      componentProps: {
        idList : this.listId,
        create : 1
      }
    });
    mo.onDidDismiss().then((d: any) => 
      this.fetchItems()
    );
    await mo.present();
  }

}
