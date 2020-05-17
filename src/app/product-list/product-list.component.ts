// @ts-ignore
import { Router } from '@angular/router';
import { ProductsManagmentService } from './../products-managment.service';
// @ts-ignore
import { Component, OnInit } from "@angular/core";

// @ts-ignore
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
       allProducts;
  constructor(private productsManagmentService: ProductsManagmentService, private router: Router) {}

  ngOnInit() {

    this.productsManagmentService.getProducts().subscribe(val => {
      console.log(val.results);
      this.allProducts = val.results;
    });
  }

editHandler(prodId) {
  // alert("");
  this.router.navigate([`/products/${prodId}/edit`]);

}
detailsHandler(prodId) {
  this.router.navigate(['/products/', prodId]);
}

createButton(prodId) {
  this.router.navigate(['/products/new']);
}

deleteButton(prodId) {
  alert('A Product has been deleted, please reload to see changes!');
  // this.router.navigate(['/products/new']);
  this.productsManagmentService.delete(prodId).subscribe(()=>{});
}


}
