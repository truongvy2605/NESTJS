import { Injectable } from '@nestjs/common';
import { CartService } from 'src/cart/cart.service';
import { CartItem, Product } from 'src/model/product.model';

@Injectable()
export class ProductService {
  produtList = [];
  create(createProductDto: Product) {
    createProductDto.id = Date.now().toString();
    this.produtList.push(createProductDto);
    return {
      message: "Create success",
    };
  }

  findAll(): any {
    return {
      data: this.produtList,
    };
  }

  findOne(id: string) {
    for(let i = 0;i<this.produtList.length;i++){
      if(this.produtList[i].id == id){
        return {
          data: this.produtList[i],
        };
      }
    } throw Error("Don't find id");
    
  }

  update(id: string, newProductDto: Product) {
    for(let i = 0;i<this.produtList.length;i++){
      if(this.produtList[i].id == id){
        this.produtList[i] = {
          ...this.produtList[i],
          ... newProductDto
        }
        return {
          message: 'Update success',
          data: newProductDto
        };
      }
      
    }
    throw Error("Don't find id to update");
  }

  remove(id: string) {
    for(let i = 0; i< this.produtList.length;i++){
      if(this.produtList[i].id==id){
          this.produtList.splice(i,1);
          return {
              message: 'delete success',
          };
      }
  }
  throw Error ("Don't find product to delete");
  }

  cart: CartItem[] = [];
  addToCart(Id: string, quantity: number){
    let item = this.produtList.find((item)=>item.id == Id);
    if(item == undefined){
      throw "Item doesn't exist";
    }
    if(item.stock < quantity) {
      throw 'Out of stock'
    }
    let cartItem = this.cart.find((item)=>item.item.id == Id);
    if(cartItem == undefined){
      this.cart.push({
        item: item,
        quantity: quantity,
      });
    }else {
      cartItem.quantity +=quantity;
    }
    return {
      message: "Add to cart success",
      data: cartItem
    };
  }

  findAllCart(){
    return {
      carts: this.cart,
    };
  }

  total = 0;
  purchase() {
    for(let i = 0;i<this.cart.length;i++){
      this.total +=this.cart[i].quantity * this.cart[i].item.price;
    }
    this.cart = [];
    return {
      total: "Tổng tiền là " + this.total,
    };  
  }
}
