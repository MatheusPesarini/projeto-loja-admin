import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { eq, InferInsertModel } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { DATABASE_CONNECTION } from "src/database/database-connection";
import * as schema from "src/database/schema/schema";
import * as argon2 from "argon2";
import { VendorLoginData } from "./dto/vendor.request";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class VendorService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
    private readonly jwtService: JwtService,
  ) {}

  async getAllVendors() {
    return this.database.query.vendor.findMany();
  }

  async registerVendor(vendorData: InferInsertModel<typeof schema.vendor>) {
    vendorData.password = await argon2.hash(vendorData.password);
    const createdVendor = await this.database
      .insert(schema.vendor)
      .values(vendorData)
      .returning({ id: schema.vendor.id });

    if (!createdVendor || createdVendor.length === 0) {
      throw new UnauthorizedException("Erro ao criar o vendedor");
    }

    this.logger.log("Novo vendedor criado:", createdVendor[0].id);

    return {
      vendorId: createdVendor[0].id,
      message: "Vendor created successfully",
    };
  }

  async vendorLogin(vendorData: VendorLoginData) {
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

    const payload = {
      vendorId: vendor.id,
      expiresAt: Date.now() + 60 * 60 * 1000 * 24 * 7, // 7 dias
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      success: true,
      message: "Login bem-sucedido",
    };
  }
}
