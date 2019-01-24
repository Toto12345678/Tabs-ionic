import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

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
    private modal : ModalController
  ) { }

  ngOnInit() {
    this.formList = this.formBuilder.group({
      'name' : ['', Validators.required]
    });
  }

  async createList() {
    console.log(this.formList.value);
    this.modal.dismiss();
    this.router.navigateByUrl('/dashboard/tabs/details');
  }

}
