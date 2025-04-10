import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { VendorController } from "./vendor/vendor.controller";
import { VendorService } from "./vendor/vendor.service";
import { VendorModule } from "./vendor/vendor.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    VendorModule,
  ],
  controllers: [VendorController],
  providers: [VendorService],
})
export class AppModule {}
