import { IsString } from 'class-validator';

export class ProductDto {
   @IsString()
   engine: string;

   @IsString()
   privod: string;

   @IsString()
   speed: string;

   @IsString()
   model: string;

   @IsString()
   price: number;

   @IsString()
   power: string;

   @IsString()
   year: string;

   @IsString()
   nalog: string;
}
