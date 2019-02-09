import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-modal-new',
  templateUrl: './modal-new.component.html',
  styleUrls: ['./modal-new.component.scss']
})
export class ModalNewComponent implements OnInit {
  formEdit : FormGroup
  id: number
  constructor(
    private formBuilder : FormBuilder,
    private modal : ModalController,
    private dbService : DatabaseService
  ) { }

  ngOnInit() {
    this.formEdit = this.formBuilder.group({
      'name' : ['', Validators.required],
      'status' : ['', Validators.required]
    });
  }

  editList() {//n: string, stat: string, i: number)
    this.dbService.updateList(this.formEdit.get('name').value,parseInt(this.formEdit.get('status').value),this.id).then(response =>{
      console.log(response);
      this.modal.dismiss();
    }).catch (e => {
      console.log(e)
    })
  }

}
