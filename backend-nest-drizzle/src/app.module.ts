import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { VendorModule } from "./vendor/vendor.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    VendorModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
