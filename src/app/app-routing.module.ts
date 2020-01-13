import { ProductDetailsComponent } from "./product-details/product-details.component";
import { UpdateProductComponent } from "./update-product/update-product.component";
import { NewProductComponent } from "./new-product/new-product.component";
import { CommerceManagerComponent } from "./commerce-manager/commerce-manager.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { FormBuilder, FormGroup, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ProductListComponent } from "./product-list/product-list.component";

const routes: Routes = [
  {
    path: "",
    component: CommerceManagerComponent,
    children: [
      {
        path: "",
        redirectTo: "/products",
        pathMatch: "full"
      },
      { path: "products", component: ProductListComponent },
      { path: "products/new", component: NewProductComponent },
      { path: "products/:id/edit", component: UpdateProductComponent },
      { path: "products/:id", component: ProductDetailsComponent },

      { path: "**", component: CommerceManagerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
