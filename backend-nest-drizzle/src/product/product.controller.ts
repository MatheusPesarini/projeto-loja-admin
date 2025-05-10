import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import {
  createProductRequest,
  deleteProductRequest,
  editProductRequest,
} from "./dto/product.request";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Delete(":vendorId")
  @HttpCode(HttpStatus.OK)
  async deleteVendorProduct(@Body() vendorProductData: deleteProductRequest) {
    return this.productService.deleteVendorProduct(vendorProductData);
  }

  @Patch(":vendorId")
  @HttpCode(HttpStatus.OK)
  async getProduct(@Body() vendorProductData: editProductRequest) {
    return this.productService.editVendorProduct(vendorProductData);
  }

  @Get(":vendorId")
  async getAllVendorProducts(
    @Param("vendorId", ParseUUIDPipe) vendorId: string,
  ) {
    return this.productService.getAllVendorProducts(vendorId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createVendorProduct(@Body() vendorProductData: createProductRequest) {
    return this.productService.createVendorProduct(vendorProductData);
  }
}
