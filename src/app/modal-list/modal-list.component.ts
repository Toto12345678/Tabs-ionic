import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-modal-list',
  templateUrl: './modal-list.component.html',
  styleUrls: ['./modal-list.component.scss']
})
export class ModalListComponent implements OnInit {
  formList : FormGroup
  constructor(
    private formBuilder : FormBuilder,
    private router : Router,
    private modal : ModalController,
    private dbService : DatabaseService
  ) { }

  ngOnInit() {
    this.formList = this.formBuilder.group({
      'name' : ['', Validators.required]
    });
  }

  async createList() {
    console.log(this.formList.value);
    this.dbService.createList(this.formList.get('name').value).then(response =>{
      console.log(response) // reload page of lists: this.dbService.getAllList().then
      //actualizar lista, editarla y eliminarlas, junto con el join
      this.modal.dismiss();
      //this.router.navigateByUrl('/dashboard/tabs/details');
    }).catch (e => {
      console.log(e)
    })
  }

}
