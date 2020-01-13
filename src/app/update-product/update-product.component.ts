import { Router } from '@angular/router';
import { ProductsManagmentService } from './../products-managment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

current_product;

 product_name = '';
 product_price = 0;
 product_quantity = 0;
 warningMessage = '';
 errorMessage;

 constructor(
   private productsManagmentService: ProductsManagmentService,
   private cdRef: ChangeDetectorRef,
   private route: ActivatedRoute,
   private router: Router
 ) {}


 ngOnInit() {
  this.route.params.subscribe(params=> {

      this.productsManagmentService.getProductById(params['id']).subscribe(
        result => {
         this.product_name=result.product.product_name;
         this.product_price=result.product.product_price;
         this.product_quantity=result.product.product_quantity;

        },
        error => (this.errorMessage = error.error.errors[0].detail)
      );


    }

  );
 }

 editHandler(data: any) {
  this.route.params.subscribe(params => {

      this.productsManagmentService.edit(data.value, params.id).subscribe(
        result => {
            this.router.navigate(['/']);
        },
        error => (this.errorMessage = error.error.errors[0].detail)
      );


    }

  );

 }

 ngAfterViewChecked() {
  if (this.product_name.length < 3) {
    this.warningMessage = "Name must be more than 3 chracter";
  } else
  if (this.product_price < 0) {
    this.warningMessage = "Number must be greater than 0 ";
  } else
  if (this.product_quantity < 0) {
    this.warningMessage = "Number must be greater than 0 ";
  } else {
    this.warningMessage = "";
  }
}
}
