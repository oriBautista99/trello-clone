import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { DataSourceProduct } from './data-source';
import {FormControl} from '@angular/forms'
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html'
})
export class TablesComponent implements OnInit{

  dataSource = new DataSourceProduct();
  columns: string[] = ['id', 'title', 'price', 'cover', 'actions'];
  total = 0;
  input = new FormControl('', {nonNullable: true});

  constructor(
    private http: HttpClient
  ){

  }


  ngOnInit(): void {
      this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
        .subscribe(data => {
          this.dataSource.init(data);
        });
    this.input.valueChanges
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.dataSource.find(value)
    });
  }

  update(product: Product){
    this.dataSource.update(product.id,{price: 20})
  }
}
