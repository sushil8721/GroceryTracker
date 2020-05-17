import { Component, OnInit } from '@angular/core';
import {ProductsManagmentService} from "../products-managment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  current_product;

  constructor(private productsManagmentService: ProductsManagmentService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(params=>
      {
        console.log(params['id']);

        this.productsManagmentService.getProductById(params['id']).subscribe(result=>{
           this.current_product=result.product;

          }


        )
      }

    );


  }
  backHandler(){
    this.router.navigate(["/"]);

  }
  deleteHandler(gen_id){

    this.productsManagmentService.delete(gen_id).subscribe(val=>{
      this.router.navigate(["/products"]);

    })


  }

}
