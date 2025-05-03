import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { ProductService } from "./product.service";
import { createProductRequest } from "./dto/product.request";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(":vendorId")
  async getAllVendorProducts(@Param("vendorID", ParseUUIDPipe) vendorId: string) {
    return this.productService.getAllVendorProducts(vendorId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createVendorProduct(@Body() vendorProductData: createProductRequest) {
    return this.productService.createVendorProduct(vendorProductData);
  }
}
