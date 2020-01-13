import { Router } from '@angular/router';
import { ProductsManagmentService } from "./../products-managment.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit {
       allProducts;
  constructor(private productsManagmentService: ProductsManagmentService,private router: Router) {}

  ngOnInit() {
    this.productsManagmentService.getProducts().subscribe(val => {
      console.log(val.results);
      this.allProducts = val.results;
    });
  }

editHandler(prodId){
  this.router.navigate([`/products/${prodId}/edit`]);

}
detailsHandler(prodId){
  this.router.navigate(['/products/',prodId]);
}

createButton(prodId){
  this.router.navigate(['/products/new']);
}


}
