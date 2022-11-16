import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Item } from 'src/model/item.model';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {};
    @Get('/all')
    getAllCart():any {
        return this.cartService.getAllCart();
    }

    @Get("/one/:id")
    getById(@Param('id') id:string){
        return this.cartService.getById(id);
    }

    @Post()
    add(@Body() item: Item){
        return this.cartService.add(item);
    }
    @Put('/:id')
    update(@Body() newItem:Item, @Param('id') id:string){
        try{
            return this.cartService.update(id, newItem);
        }catch(err){
            return {
                message: 'Khong the cap nhat',
                error: err.message,
            }
        }    
    }
    @Delete('/:id')
    delete(@Param('id') id:string){
        try {
            return this.cartService.delete(id)
        } catch (err) {
            return {
                message: 'Khong the xoa',
                error: err.message,
            }
        }
    }
}
