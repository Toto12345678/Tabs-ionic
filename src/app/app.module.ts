import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';
import { ModalListComponent } from './modal-list/modal-list.component';
import { ModalNewComponent } from './modal-new/modal-new.component';
import { ModalItemListComponent } from './modal-item-list/modal-item-list.component'
import {Camera} from '@ionic-native/camera/ngx';
import { GetDataService } from './get-data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ModalListComponent, ModalNewComponent, ModalItemListComponent],
  entryComponents: [
    ModalListComponent,
    ModalNewComponent,
    ModalItemListComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatabaseService,
    GetDataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
