import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Types } from 'mongoose';

@Controller('catalog')
export class ProductsController {
   constructor(private readonly productsService: ProductsService) {}

   @Get(':_id')
   async getProduct(@Param('_id') _id: Types.ObjectId) {
      return this.productsService.byId(_id);
   }

   @Get()
   async getAllProducts(
      @Query('searchTerm') searchTerm?: string,
      @Query('typeFilter') typeFilter?: string,
      @Query('modelFilter') modelFilter?: string,
      @Query('colorsFilter') colorsFilter?: string,
   ) {
      return this.productsService.getAll(searchTerm, colorsFilter, modelFilter, typeFilter);
   }
}
