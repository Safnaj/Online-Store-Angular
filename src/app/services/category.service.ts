import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db
      .list('/categories', ref => ref.orderByChild('name'))
      .snapshotChanges();
  }

  getAll(): Observable<any[]> {
    return this.db.list('/categories')
    .snapshotChanges().pipe(
      map(category =>
        category.map(cat => {
            const key = cat.key;
            const payload = cat.payload.val();
            return { key, ...payload };
          })),
        );
  }

}
