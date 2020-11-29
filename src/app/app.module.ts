import { OrderService } from './services/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule,Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

import { LoginComponent } from './login/login.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';

import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';

import { ProductService } from './services/product.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './check-out/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './check-out/shipping-form/shipping-form.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';


const routes: Routes = [
  
  { path: '', component: ProductsComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent},
  { path: 'login', component: LoginComponent},

  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  
  { 
    path: 'admin/products/new', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },

  { 
    path: 'admin/products/:id', 
    component: ProductFormComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },

  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  },

  { path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AuthGuard, AdminAuthGuard] 
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(routes)    
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
