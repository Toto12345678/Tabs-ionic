import { Component, OnInit } from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-modal-item-list',
  templateUrl: './modal-item-list.component.html',
  styleUrls: ['./modal-item-list.component.scss']
})
export class ModalItemListComponent implements OnInit {
  formCreateItem : FormGroup
  idList : number
  create : number
  id : number

  constructor(
    private camera : Camera,
    private formBuilder : FormBuilder,
    private modal : ModalController,
    private dbService : DatabaseService
  ) { }

  ngOnInit() {
    this.formCreateItem = this.formBuilder.group({
      'name' : ['', Validators.required],
      'description' : ['', Validators.required],
      'price' : ['', Validators.required],
      'image' : ['', Validators.required]
    });
  }

  options: CameraOptions = {
    quality: 80,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    saveToPhotoAlbum: true
  }

  takePhoto(){
    console.log('take photo')
    this.camera.getPicture(this.options).then((imageData) => {
      console.log(imageData);
      this.formCreateItem.controls['image'].setValue('data:image/jpeg;base64,' + imageData)
    }, (err) => {
      console.log(err)  
    });
  }

  createItem() {//n: string, stat: string, i: number)
    //listId : number, name: string, description: string, price: number, image: string
    if(this.create == 1){
      this.dbService.createItemList(this.idList, this.formCreateItem.get('name').value, this.formCreateItem.get('description').value, parseFloat(this.formCreateItem.get('price').value), this.formCreateItem.get('image').value).then(response =>{
        console.log(response);
        this.modal.dismiss();
      }).catch (e => {
        console.log(e)
      })
    } else {
      if(this.create == 0){
        this.dbService.updateItemList(this.formCreateItem.get('name').value, this.formCreateItem.get('description').value, parseFloat(this.formCreateItem.get('price').value), this.formCreateItem.get('image').value, this.id).then(response =>{
          console.log(response);
          this.modal.dismiss();
        }).catch (e => {
          console.log(e)
        })
      }
    }
  }

}
