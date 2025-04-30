import { IsNotEmpty, IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';


export class createProductRequest {
  @IsNotEmpty()
    
  name: string;

  category: string;
  price: string;
  discount: string;
  vendorId: string;
  quantity: number;
  description: string;
  image: string;
}
