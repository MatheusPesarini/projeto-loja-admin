import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { VendorService } from "./vendor.service";
import { VendorLoginData, VendorRegisterData } from "./dto/vendor.request";

@Controller("vendor")
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get()
  async getAllVendors() {
    return this.vendorService.getAllVendors();
  }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async createVendor(@Body() vendorData: VendorRegisterData) {
    return this.vendorService.registerVendor(vendorData);
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  async vendorLogin(@Body() vendorData: VendorLoginData) {
    return this.vendorService.vendorLogin(vendorData);
  }
}
