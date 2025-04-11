import { Inject, Injectable } from "@nestjs/common";
import { InferInsertModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";

@Injectable()
export class VendorService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getAllVendors() {
    return this.database.query.vendor.findMany();
  }

  async createVendor(vendorData: InferInsertModel<typeof schema.vendor>) {
    await this.database.insert(schema.vendor).values(vendorData);
  }
}
