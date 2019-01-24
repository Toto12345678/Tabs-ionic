import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formLogin : FormGroup

  password = '1234'
  email = 'toto@yopmail.com'
  exprRegEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor(
    private formBuilder : FormBuilder,
    private location : Location,
    private alert : AlertController,
    private router : Router
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      'email' : ['', Validators.compose([Validators.required, Validators.pattern(this.exprRegEmail)])],
      'password' : ['', Validators.required]
    });
  }

  back() : void {
    this.location.back()
  }

  async send() {
    if(this.formLogin.value.email=== this.email && this.formLogin.value.password === this.password) {
      console.log(this.formLogin.value)
      console.log('pasa')
      this.router.navigateByUrl('/dashboard/tabs/tab1')
    } else {
      const alert = await this.alert.create({
        header: 'Error',
        subHeader: 'Credenciales incorrectas',
        message: 'Intente nuevamente',
        buttons: ['Ok']
      });
  
      await alert.present();
    }
  }

}
