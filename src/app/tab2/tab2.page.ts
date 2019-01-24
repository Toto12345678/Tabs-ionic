import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  formEdit : FormGroup
  regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  data = {
    name: 'Toto Gómez',
    age: 80,
    email: 'toto@yopmail.com',
    password: 1234
  }
  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController
  ) { }

  ngOnInit() {
    this.formEdit = this.formBuilder.group({
      'name' : ['', Validators.required],
      'age' : ['', Validators.required],
      'password' : ['', Validators.required],
      'email' : ['', Validators.compose([Validators.required, Validators.pattern(this.regexEmail)])]
    })
  }

  async save () {
    const alert = await this.alert.create({
      header: 'Operación exitosa',
      subHeader: 'Usuario actualizado con éxito',
      message: 'mentira',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
