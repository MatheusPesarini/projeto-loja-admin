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

  @IsNotEmpty({ message: "O preço não pode estar vazio." })
  @IsNumber({}, { message: "O preço deve ser um número." })
  @Min(0.01, { message: "O preço deve ser maior que 0." })
  @Max(999999, { message: "O preço deve ser menor que 999999." })
  price: number;

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
