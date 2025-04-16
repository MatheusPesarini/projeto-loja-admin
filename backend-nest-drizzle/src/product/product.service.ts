import { Inject, Injectable } from "@nestjs/common";
import { InferInsertModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getAllVendorProducts(vendorId: string) {
    return this.database.query.product.findMany({
      where: (product, { eq }) => eq(product.vendorId, vendorId),
    });
  }

  async createVendorProduct(
    vendorProductData: InferInsertModel<typeof schema.product>,
  ) {
    await this.database.insert(schema.product).values(vendorProductData);
  }
}
