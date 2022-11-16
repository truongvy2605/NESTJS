import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { Product } from 'src/model/product.model';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: Product) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/find/:id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: Product) {
    try {
      return this.productService.update(id, updateProductDto);
    } catch (err) {
      return {
        message: " Can not Update ",
        error: err.message,
      };
    }
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (error) {
      return {
        message: 'Can not remove',
        error: error.message,
      };
    }  
  }

  @Post('/addCart/:id')
  addToCart(@Param('id') id: string){
    try {
      return this.productService.addToCart(id,1);
    } catch (error) {
      return {
        message: 'Can not add',
        error: error.message,
      };
    }
  }

  @Get("allcart")
  finAllCart(){
    return this.productService.findAllCart();
  }

  @Get('sum')
  purchase(){
    return this.productService.purchase();
  }
}
