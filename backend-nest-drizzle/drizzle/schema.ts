import {
  pgTable,
  foreignKey,
  uuid,
  integer,
  timestamp,
  text,
  real,
  unique,
} from "drizzle-orm/pg-core";

export const order = pgTable(
  "Order",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid().notNull(),
    productId: uuid().notNull(),
    quantity: integer().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Order_userId_User_id_fk",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "Order_productId_Product_id_fk",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const product = pgTable(
  "Product",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    name: text().notNull(),
    category: text().notNull(),
    price: real().notNull(),
    quantity: integer().notNull(),
    description: text(),
    image: text().notNull(),
    createdAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp({ withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    vendorId: uuid(),
  },
  (table) => [
    foreignKey({
      columns: [table.vendorId],
      foreignColumns: [vendor.id],
      name: "Product_vendorId_Vendor_id_fk",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const user = pgTable(
  "User",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    name: text(),
  },
  (table) => [unique("User_email_unique").on(table.email)],
);

export const vendor = pgTable(
  "Vendor",
  {
    id: uuid().defaultRandom().primaryKey().notNull(),
    companyName: text().notNull(),
    cnpj: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [
    unique("Vendor_companyName_unique").on(table.companyName),
    unique("Vendor_cnpj_unique").on(table.cnpj),
    unique("Vendor_email_unique").on(table.email),
  ],
);
