import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";
import {
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
} from "./dto/product.request";
import { eq } from "drizzle-orm";

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async deleteVendorProduct(productDataDto: deleteProductRequest) {
    const { vendorId, productName } = productDataDto;

    const vendorExists = await this.database.query.vendor.findFirst({
      where: eq(schema.vendor.id, vendorId),
      columns: { id: true },
    });

    if (!vendorExists) {
      throw new NotFoundException(
        `Vendedor com ID ${vendorId} não encontrado.`,
      );
    }

    const product = await this.database.query.product.findFirst({
      where: (product) =>
        eq(product.vendorId, vendorId) && eq(product.productName, productName),
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com nome "${productName}" não encontrado para o vendedor.`,
      );
    }

    const imageUrl = product.image;

    const deletedImage = fetch(`http://localhost:4000/delete-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl }),
    });

    if (!deletedImage) {
      throw new InternalServerErrorException(
        "Falha ao deletar a imagem do produto.",
      );
    }

    const deletedProduct = await this.database
      .delete(schema.product)
      .where(eq(schema.product.id, product.id))
      .returning();

    if (!deletedProduct) {
      throw new InternalServerErrorException(
        "Falha ao deletar o produto e retornar os dados.",
      );
    }

    return deletedProduct;
  }

  async editVendorProduct(productDataDto: editProductRequest) {
    const { vendorId, oldProductId, ...updateData } = productDataDto;

    const vendorExists = await this.database.query.vendor.findFirst({
      where: eq(schema.vendor.id, vendorId),
      columns: { id: true },
    });

    if (!vendorExists) {
      throw new NotFoundException(
        `Vendedor com ID ${vendorId} não encontrado.`,
      );
    }

    const product = await this.database.query.product.findFirst({
      where: (product) =>
        eq(product.vendorId, vendorId) && eq(product.productName, oldProductId),
    });

    if (!product) {
      throw new NotFoundException(
        `Produto com nome "${oldProductId}" não encontrado para o vendedor.`,
      );
    }

    const productToUpdate = {
      productName: productDataDto.productName,
      brand: productDataDto.brand,
      model: productDataDto.model,
      category: productDataDto.category,
      originalPrice: String(productDataDto.originalPrice),
      discountedPrice:
        productDataDto.discountedPrice !== undefined
          ? String(productDataDto.discountedPrice)
          : product.discountedPrice,
      discount:
        productDataDto.discount !== undefined
          ? String(productDataDto.discount)
          : product.discount,
      quantity: productDataDto.quantity,
      description: productDataDto.description,
      image: productDataDto.image ?? product.image,
      vendorId: productDataDto.vendorId,
    };

    const [updatedProduct] = await this.database
      .update(schema.product)
      .set(productToUpdate)
      .where(eq(schema.product.id, product.id))
      .returning();

    if (!updatedProduct) {
      throw new InternalServerErrorException(
        "Falha ao atualizar o produto e retornar os dados.",
      );
    }

    return updatedProduct;
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
      originalPrice: String(productDataDto.originalPrice),
      discountedPrice:
        productDataDto.discountedPrice !== undefined
          ? String(productDataDto.discountedPrice)
          : null,
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
