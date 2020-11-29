import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product:any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');    
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p =>{
      this.product = p;            
    });
    
  }

  save(product) {
    //console.log(product);
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    
    this.router.navigate(['/admin/products']);
  }

  delete(){
    if(confirm('Are you sure you want to delete this product ??')) {
      this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }else{
      return;
    }
  }

  ngOnInit() {
  }

}
