import {
  pgTable,
  timestamp,
  text,
  integer,
  uniqueIndex,
  foreignKey,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const vendor = pgTable(
  "Vendor",
  {
    id: text().primaryKey().notNull(),
    companyName: text().notNull(),
    email: text().notNull(),
    password: text().notNull(),
  },
  (table) => [
    uniqueIndex("Vendor_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
  ],
);

export const order = pgTable(
  "Order",
  {
    id: text().primaryKey().notNull(),
    userId: text().notNull(),
    productId: text().notNull(),
    quantity: integer().notNull(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "Order_userId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.productId],
      foreignColumns: [product.id],
      name: "Order_productId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("restrict"),
  ],
);

export const product = pgTable(
  "Product",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    category: text().notNull(),
    price: doublePrecision().notNull(),
    quantity: integer().notNull(),
    description: text(),
    image: text(),
    createdAt: timestamp({ precision: 3, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp({ precision: 3, mode: "string" }).notNull(),
    vendorId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.vendorId],
      foreignColumns: [vendor.id],
      name: "Product_vendorId_fkey",
    })
      .onUpdate("cascade")
      .onDelete("set null"),
  ],
);

export const user = pgTable(
  "User",
  {
    id: text().primaryKey().notNull(),
    email: text().notNull(),
    password: text().notNull(),
    name: text(),
  },
  (table) => [
    uniqueIndex("User_email_key").using(
      "btree",
      table.email.asc().nullsLast().op("text_ops"),
    ),
  ],
);
