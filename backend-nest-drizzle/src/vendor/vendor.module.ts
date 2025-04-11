import { Module } from "@nestjs/common";
import { VendorController } from "./vendor.controller";
import { VendorService } from "./vendor.service";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [VendorController],
  providers: [VendorService],
})
export class VendorModule {}
