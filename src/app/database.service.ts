import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db :SQLiteObject = null

  constructor() { }
  
  setDatabase(db: SQLiteObject){
    console.log(db);
    if(this.db === null){
      this.db = db;
    }
  }

  createTables(){
    let query : string = "CREATE TABLE IF NOT EXISTS list(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), date DATE, status INTEGER, total FLOAT);" 
    let query1 : string ="CREATE TABLE IF NOT EXISTS list_items(id INTEGER PRIMARY KEY AUTOINCREMENT, list_id INTEGER, name VARCHAR(100), description TEXT, price FLOAT, image TEXT, FOREIGN KEY(list_id) REFERENCES list(id) ON UPDATE CASCADE)"; 
    this.db.executeSql(query, []);
    return this.db.executeSql(query1,[])
  }

  getAllList(){
    let query = 'SELECT * FROM list';
    let getTotal = 'SELECT list.id,list.name,date,status,sum(price) total FROM list LEFT JOIN list_items ON list.id= list_items.list_id GROUP BY list.id'
    return this.db.executeSql(getTotal, []).then(items => {
      let list = [];
      for (let index = 0; index < items.rows.length; index++) {
        console.log(items.rows.item(index))
        list.push(items.rows.item(index));
      }
      return Promise.resolve(list);
    }).catch(e =>{
      console.log(e)
      Promise.reject(e)
    });
  }

  getAllItemsList(id: number){
    let query = 'SELECT * FROM list_items WHERE list_id = ?';
    return this.db.executeSql(query, [id]).then(items => {
      let list = [];
      console.log(items)
      for (let index = 0; index < items.rows.length; index++) {
        list.push(items.rows.item(index));
      }
      return Promise.resolve(list);
    }).catch(e =>{
      console.log(e)
      Promise.reject(e)
    });
  }

  createList(name : string){
    let query = 'INSERT INTO list(name, date, status) VALUES(?, date("now","localtime"), "0")';
    return this.db.executeSql(query,[name]);
  }

  createItemList(listId : number, name: string, description: string, price: number, image: string){
    let query = `INSERT INTO list_items(list_id, name, description, price, image) VALUES(?, ?, ?, ?, ?)`;
    return this.db.executeSql(query,[listId, name, description, price, image]);
  }

  updateList(n: string, stat: number , i: number){
    let query = `UPDATE list SET name=?, status=? WHERE id=?`;
    return this.db.executeSql(query,[n,stat,i]);
  }

  updateItemList(name: string, description: string, price: number, image: string, id: number){
    let query = `UPDATE list_items SET name=?, description=?, price=?, image=? WHERE id=?`;
    return this.db.executeSql(query,[name, description, price, image, id]);
  }

  deleteList(i : number){
    let query = `DELETE FROM list WHERE id = ?`;
    return this.db.executeSql(query,[i]);
  }

  deleteItemList(id : number, list_id : number){
    let query = `DELETE FROM list_items WHERE id = ? AND list_id = ?`;
    return this.db.executeSql(query,[id, list_id]);
  }
}
