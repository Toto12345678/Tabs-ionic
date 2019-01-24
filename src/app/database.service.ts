import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private dbObject : SQLiteObject
  ) { }

  getAllList(){

  }

  getAllItemsList(){

  }

  createList(db: SQLiteObject){
    let query = 'INSERT INTO list(name, date, status) VALUES("Xbox", now(), "0")';
    return db.executeSql(query);
  }

  createItemList(){

  }

  updateList(){

  }

  updateItemList(){

  }
}
