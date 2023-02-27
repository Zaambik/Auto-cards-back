import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProductModel } from './products.model';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
   constructor(
      @InjectModel(ProductModel)
      private readonly ProductModel: ModelType<ProductModel>,
   ) {}

   async getAll(searchTerm?: string, colorsFilter?: string, modelFilter?: string, priceFilter?: string) {
      let colorsOptions = {};
      let modelOptions = {};
      let priceOptions = {}

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

      if (colorsFilter) {
         const options = colorsFilter.split(',');
         colorsOptions = {
            $or: options.map((item) => ({ colors: new RegExp(item, 'i') })),
         };
      }

      if (modelFilter) {
         const options = modelFilter.split(',');
         modelOptions = {
            $or: options.map((item) => ({ model: new RegExp(item, 'i') })),
         };
      }

      if (priceFilter) {
         const options = priceFilter.split(',');
         priceOptions = {
            price: { $gte: Number(options[0]), $lt: Number(options[1]) },
         };
      }

      return this.ProductModel.find({
         $and: [{ ...priceOptions }, { ...modelOptions }, { ...colorsOptions }],
      }).exec();
   }
   async byId(_id: Types.ObjectId): Promise<ProductModel> {
      const product = await this.ProductModel.findById(_id);
      return product;
   }

   async create(param: ProductDto) {
      const defaultValue: ProductDto = {
         engine: param.engine,
         privod: param.privod,
         speed: param.speed,
         model: param.model,
         image: param.image,
         price: Number(param.price),
         power: param.power,
         year: param.year,
         nalog: param.nalog,
      };
      

      const product = await this.ProductModel.create(defaultValue);
      return product._id;
   }

   async delete(_id: string) {
      const deleteProduct = await this.ProductModel.findByIdAndDelete(_id).exec();
      if (!deleteProduct) throw new NotFoundException('product not found');
      return { _id: deleteProduct._id, title: deleteProduct.model };
   }

}
