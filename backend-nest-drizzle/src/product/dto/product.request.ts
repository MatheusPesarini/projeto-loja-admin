import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
} from "class-validator";

export class createProductRequest {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsOptional()
  @IsString()
  discount: string;

  @IsNotEmpty()
  @IsUUID()
  vendorId: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;
}
