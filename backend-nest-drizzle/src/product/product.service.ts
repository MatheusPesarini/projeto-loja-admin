import { Inject, Injectable } from "@nestjs/common";
import { InferInsertModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";

@Injectable()
export class ProductService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private reandonly database: NodePgDatabase<typeof schema>,
  ) { }
  
  async getAllVendorProducts() {

  }

  async createVendorProduct(vendorProductData: InferInsertModel<typeof schema.product) {
    await this.database.insert(schama.valor).values(vendorData);
  }
}
