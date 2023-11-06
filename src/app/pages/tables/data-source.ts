import {CollectionViewer, DataSource} from '@angular/cdk/collections'
import { Product } from 'src/app/models/product.model';
import {BehaviorSubject, Observable} from 'rxjs';

export class DataSourceProduct extends DataSource<Product>{

  data = new BehaviorSubject<Product[]>([]);
  originlData: Product[] = [];

  connect() : Observable<Product[]> {
    return this.data;
  }

  init(products: Product[]){
    this.data.next(products);
    this.originlData = products;
  }

  getTotal(){
    const products = this.data.getValue();
    return products.map(item => item.price).reduce((price, total) => price+total, 0);
  }

  update(id:Product['id'], change: Partial<Product>){
    const products = this.data.getValue();
    const productIndex = products.findIndex( item => item.id === id);
    if(productIndex !== -1){
      products[productIndex]={
        ...products[productIndex],
        ...change
      }
      this.data.next(products);
    }
  }

  find(query: string){
    const newProducts = this.originlData
      .filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.price == Number(query) ||
        item.id == query
      );
    this.data.next(newProducts);
  }

  disconnect(): void {
  }

}
