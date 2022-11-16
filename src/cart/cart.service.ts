import { Body, Injectable } from '@nestjs/common';
import { Item } from 'src/model/item.model';

@Injectable()
export class CartService {
  cartList = [];
  getAllCart(): any {
    return {
      data: this.cartList,
    };
  }

  getById(id: string){
    for(let i = 0;i<this.cartList.length;i++){
      if(this.cartList[i].id==id){
        return {
          data: this.cartList[i],
        };
      }
    } throw Error("khong tim thay id can tim");
  }

  add(item: Item) {
    item.id = Date.now().toString();
    this.cartList.push(item);
    return {
      message: 'Them thanh cong',
    };
  }
  update(id:string, newItem: Item){
    for(let i = 0; i<this.cartList.length;i++){
        if(this.cartList[i].id==id){
            this.cartList[i] = {
                ...this.cartList[i],
                ... newItem
            }
            return {
                message: 'Cap nhat thanh cong',
                data: newItem
            }
        }  
    }
    throw Error("Khong co id nao trung voi id da nhap");
  }

  delete(id:string){
    for(let i = 0; i< this.cartList.length;i++){
        if(this.cartList[i].id==id){
            this.cartList.splice(i,1);
            return {
                message: 'Xoa thanh cong',
            };
        }
    }
    throw Error ("Khong tim thay item co id trung khop");
  }
}
