import { Controller, Get, Post, Body } from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { createVendorRequest } from "./dto/create-vendor.request";

@Controller("vendor")
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async getAllVendors() {
    return this.vendorService.getAllVendors();
  }

  @Post()
  async createVendor(@Body() vendorData: createVendorRequest) {
    return this.vendorService.createVendor(vendorData);
  }
}
