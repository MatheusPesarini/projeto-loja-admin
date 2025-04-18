import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { eq, InferInsertModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";
import * as argon2 from "argon2";

@Injectable()
export class VendorService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {}

  async getAllVendors() {
    return this.database.query.vendor.findMany();
  }

  async registerVendor(vendorData: InferInsertModel<typeof schema.vendor>) {
    vendorData.password = await argon2.hash(vendorData.password);
    await this.database.insert(schema.vendor).values(vendorData);
    return { message: "Vendor created successfully" };
  }

  async vendorLogin(vendorData: InferInsertModel<typeof schema.vendor>) {
    const vendor = await this.database.query.vendor.findFirst({
      where: eq(schema.vendor.email, vendorData.email),
    });

    if (!vendor) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const isPasswordValid = await argon2.verify(
      vendor.password,
      vendorData.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Senha inválida");
    }

    return {
      message: "Login bem-sucedido",
      boolean: true,
    };
  }
}
