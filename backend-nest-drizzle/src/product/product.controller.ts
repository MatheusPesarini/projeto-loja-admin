import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { createProductRequest } from "./dto/product.request";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(":vendorId")
  async getAllVendorProducts(@Param("vendorId") vendorId: string) {
    return this.productService.getAllVendorProducts(vendorId);
  }

  @Post() // Após criar o sistema de autenticação, enviar o vendorId na requisição
  async createVendorProduct(@Body() vendorProductData: createProductRequest) {
    return this.productService.createVendorProduct(vendorProductData);
  }
}