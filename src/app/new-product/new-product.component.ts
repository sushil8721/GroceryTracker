import { ProductsManagmentService } from "./../products-managment.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked
} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"]
})
export class NewProductComponent implements OnInit, AfterViewChecked {
  product_name = "";
  product_price = 0;
  product_quantity = 0;
  warningMessage="";
  errorMessage;

  constructor(
    private productsManagmentService: ProductsManagmentService,
    private cdRef: ChangeDetectorRef,private router:Router
  ) {}

  ngOnInit() {

  }

  createHandler(data: any) {
    console.log(data.value);
    this.productsManagmentService.createProduct(data.value).subscribe(
      result => {
        this.router.navigate(["/"]);
      },
      error => (this.errorMessage = error.error.errors[0].detail)
    );
  }
   handleCancel(){
     this.router.navigate(["/products"]);

   }
  ngAfterViewChecked() {
    if (this.product_name.length < 3) {
      this.warningMessage = "Name must be more than 3 chracter";
      this.cdRef.detectChanges();

    } else
    if (this.product_price < 0) {
      this.warningMessage = "Number must be greater than 0 ";
      this.cdRef.detectChanges();

    } else
    if (this.product_quantity < 0) {
      this.warningMessage = "Number must be greater than 0 ";
      this.cdRef.detectChanges();

    } else {
      this.warningMessage = "";
      this.cdRef.detectChanges();

    }
  }
}
