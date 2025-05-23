import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from "class-validator";

export class createProductRequest {
  @IsNotEmpty({ message: "Por favor digite o nome do produto." })
  @IsString()
  @Length(1, 50, {
    message: "O nome do produto deve ter entre 1 e 50 caracteres.",
  })
  productName: string;

  @IsNotEmpty({ message: "Por favor digite a marca do produto." })
  @IsString()
  @Length(1, 20, {
    message: "A marca do produto deve ter entre 1 e 20 caracteres.",
  })
  brand: string;

  @IsNotEmpty({ message: "Por favor digite o modelo do produto." })
  @IsString()
  @Length(1, 20, {
    message: "O modelo do produto deve ter entre 1 e 20 caracteres.",
  })
  model: string;

  @IsNotEmpty({ message: "Por favor selecione a categoria." })
  @IsString()
  category: string;

  @IsNotEmpty({ message: "Por favor selecione o genêro." })
  @IsString()
  genre: string;

  @IsNotEmpty({ message: "Por favor digite a garantia do vendedor." })
  @IsString()
  warranty: string;

  @IsNotEmpty({ message: "Por favor digite o peso." })
  @IsString()
  weight: string;

  @IsNotEmpty({ message: "O preço não pode estar vazio." })
  @IsNumber({}, { message: "O preço deve ser um número." })
  @Min(0.01, { message: "O preço deve ser maior que 0." })
  @Max(999999, { message: "O preço deve ser menor que 999999." })
  originalPrice: number;

  @IsNotEmpty({ message: "O preço não pode estar vazio." })
  @IsNumber({}, { message: "O preço deve ser um número." })
  @Min(0.01, { message: "O preço deve ser maior que 0." })
  @Max(999999, { message: "O preço deve ser menor que 999999." })
  discountedPrice: number;

  @IsOptional()
  @IsNumber({}, { message: "O desconto deve ser um número." })
  @Min(0, { message: "O desconto deve ser maior ou igual a 0." })
  @Max(100, { message: "O desconto deve ser menor ou igual a 100." })
  discount?: number;

  @IsNotEmpty({ message: "ID do vendedor é obrigatório." })
  @IsUUID("4", { message: "ID do vendedor inválido." })
  vendorId: string;

  @IsNotEmpty({ message: "A quantidade não pode estar vazia." })
  @IsNumber({}, { message: "A quantidade deve ser um número." })
  @Min(1, { message: "A quantidade deve ser maior que 0." })
  @Max(999999, { message: "A quantidade deve ser menor que 999999." })
  quantity: number;

  @IsNotEmpty({ message: "Por favor digite a descrição do produto." })
  @IsString()
  @Length(1, 500, {
    message: "A descrição do produto deve ter entre 1 e 500 caracteres.",
  })
  description: string;

  @IsString()
  image?: string;
}

export class editProductRequest {
  @IsString()
  oldProductId: string;

  @IsOptional()
  @IsString()
  @Length(1, 50, {
    message: "O nome do produto deve ter entre 1 e 50 caracteres.",
  })
  productName: string;

  @IsOptional()
  @IsString()
  @Length(1, 20, {
    message: "A marca do produto deve ter entre 1 e 20 caracteres.",
  })
  brand: string;

  @IsOptional()
  @IsString()
  @Length(1, 20, {
    message: "O modelo do produto deve ter entre 1 e 20 caracteres.",
  })
  model: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsNotEmpty({ message: "Por favor selecione o genêro." })
  @IsString()
  genre: string;

  @IsNotEmpty({ message: "Por favor digite a garantia do vendedor." })
  @IsString()
  warranty: string;

  @IsNotEmpty({ message: "Por favor digite o peso." })
  @IsString()
  weight: string;

  @IsOptional()
  @IsNumber({}, { message: "O preço deve ser um número." })
  @Min(0.01, { message: "O preço deve ser maior que 0." })
  @Max(999999, { message: "O preço deve ser menor que 999999." })
  originalPrice: number;

  @IsOptional()
  @IsNumber({}, { message: "O preço deve ser um número." })
  @Min(0.01, { message: "O preço deve ser maior que 0." })
  @Max(999999, { message: "O preço deve ser menor que 999999." })
  discountedPrice: number;

  @IsOptional()
  @IsNumber({}, { message: "O desconto deve ser um número." })
  @Min(0, { message: "O desconto deve ser maior ou igual a 0." })
  @Max(100, { message: "O desconto deve ser menor ou igual a 100." })
  discount?: number;

  @IsOptional()
  @IsUUID("4", { message: "ID do vendedor inválido." })
  vendorId: string;

  @IsOptional()
  @IsNumber({}, { message: "A quantidade deve ser um número." })
  @Min(1, { message: "A quantidade deve ser maior que 0." })
  @Max(999999, { message: "A quantidade deve ser menor que 999999." })
  quantity: number;

  @IsOptional()
  @IsString()
  @Length(1, 500, {
    message: "A descrição do produto deve ter entre 1 e 500 caracteres.",
  })
  description: string;

  @IsOptional()
  @IsString()
  image?: string;
}

export class deleteProductRequest {
  @IsString()
  @Length(1, 50, {
    message: "O nome do produto deve ter entre 1 e 50 caracteres.",
  })
  productName: string;

  @IsUUID("4", { message: "ID do vendedor inválido." })
  vendorId: string;
}
