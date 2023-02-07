import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './products.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ProductsService {
   constructor(
      @InjectModel(ProductModel)
      private readonly ProductModel: ModelType<ProductModel>,
   ) {}

   async getAll(searchTerm?: string) {
      if (searchTerm) {
         return this.ProductModel.find({
            $or: [
               {
                  model: new RegExp(searchTerm, 'i'),
               },
               {
                  title: new RegExp(searchTerm, 'i'),
               },
               {
                  colors: new RegExp(searchTerm, 'i'),
               },
               {
                  info: new RegExp(searchTerm, 'i'),
               },
            ],
         }).exec();
      }

      return this.ProductModel.find().exec();
   }

   async byId(_id: Types.ObjectId): Promise<ProductModel> {
      const product = await this.ProductModel.findById(_id);
      return product;
   }
}
