import { ProductsManagmentService } from "./../products-managment.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked
} from "@angular/core";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"]
})
export class NewProductComponent implements OnInit, AfterViewChecked {
  product_name = "";
  product_price = 0;
  product_quantity = 0;
  warningMessage = "";
  errorMessage;

  constructor(
    private productsManagmentService: ProductsManagmentService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  createHandler(data: any) {
    console.log(data.value);
    this.productsManagmentService.createProduct(data.value).subscribe(
      result => {
        // this.errorMessage = '';
        console.log(result);
      },
      error => (this.errorMessage = error.error.errors[0].detail)
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
