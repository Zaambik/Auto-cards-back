import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ProductModel extends Base {}

export class ProductModel extends TimeStamps {
   @prop()
   engine: string;

   @prop()
   privod: string;

   @prop()
   speed: string;

   @prop()
   model: string;

   @prop()
   price: number;

   @prop()
   power: string;

   @prop()
   year: string;

   @prop()
   nalog: string;
}
