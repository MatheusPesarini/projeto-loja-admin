import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";
import { createProductRequest } from "./dto/product.request";
import { eq } from "drizzle-orm";

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getProduct(productId: string) {
    const product = await this.database.query.product.findFirst({
      where: eq(schema.product.id, productId),
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com ID ${productId} não encontrado.`,
      );
    }

    return product;
  }

  async getAllVendorProducts(vendorId: string) {
    const vendorExists = await this.database.query.vendor.findFirst({
      where: eq(schema.vendor.id, vendorId),
      columns: { id: true },
    });
    if (!vendorExists) {
      throw new NotFoundException(
        `Vendedor com ID ${vendorId} não encontrado.`,
      );
    }

    return this.database.query.product.findMany({
      where: eq(schema.product.vendorId, vendorId),
    });
  }

  async createVendorProduct(productDataDto: createProductRequest) {
    const vendorIdToVerify = productDataDto.vendorId;
    const vendorExists = await this.database.query.vendor.findFirst({
      where: eq(schema.vendor.id, vendorIdToVerify),
      columns: { id: true },
    });
    if (!vendorExists) {
      throw new NotFoundException(
        `Vendedor com ID ${vendorIdToVerify} não encontrado. Não é possível criar o produto.`,
      );
    }

    const productToInsert = {
      productName: productDataDto.productName,
      brand: productDataDto.brand,
      model: productDataDto.model,
      category: productDataDto.category,
      price: String(productDataDto.price),
      discount:
        productDataDto.discount !== undefined
          ? String(productDataDto.discount)
          : null,
      quantity: productDataDto.quantity,
      description: productDataDto.description,
      image: productDataDto.image ?? "url_padrao_ou_erro", // Ajuste conforme necessário
      vendorId: productDataDto.vendorId,
    };

    try {
      const [newProduct] = await this.database
        .insert(schema.product)
        .values(productToInsert)
        .returning();

      if (!newProduct) {
        throw new InternalServerErrorException(
          "Falha ao criar o produto e retornar os dados.",
        );
      }

      console.log("Produto inserido com sucesso:", newProduct);
      return newProduct;
    } catch (error) {
      console.error("Erro ao inserir produto no banco de dados:", error);
      throw new InternalServerErrorException(
        "Ocorreu um erro ao tentar criar o produto.",
      );
    }
  }
}
