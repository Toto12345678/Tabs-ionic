import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private query: string = 'create table list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(32), date DATE, status INTEGER);'+
  ' create table list_item(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT, FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE);'

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sqlite: SQLite,
    private dbService : DatabaseService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase () {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db) => {
        console.log('Excecuted sql');
        this.dbService.setDatabase(db)
        return this.dbService.createTables()
      }).then(()=>{
        this.splashScreen.hide()
      }).catch(e => console.error(e))
  }
}
