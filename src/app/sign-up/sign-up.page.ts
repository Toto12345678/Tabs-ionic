import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  formSignUp : FormGroup
  regexEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  constructor(
    private formBuilder : FormBuilder,
    private location : Location,
    private alert : AlertController
  ) { }

  ngOnInit() {
    this.formSignUp = this.formBuilder.group({
      'name' : ['', Validators.required],
      'age' : ['', Validators.required],
      'password' : ['', Validators.required],
      'email' : ['', Validators.compose([Validators.required, Validators.pattern(this.regexEmail)])]
    })
  }

  back () : void {
    this.location.back()
  }

  async save () {
    const alert = await this.alert.create({
      header: 'Operación exitosa',
      subHeader: 'Usuario registrado con éxito',
      message: 'mentira',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
