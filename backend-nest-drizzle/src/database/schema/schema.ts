import { pgTable, unique, uuid, text, foreignKey, integer, timestamp, numeric } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const user = pgTable("User", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	name: text(),
}, (table) => [
	unique("User_email_unique").on(table.email),
]);

export const order = pgTable("Order", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid().notNull(),
	productId: uuid().notNull(),
	quantity: integer().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "Order_userId_User_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.productId],
			foreignColumns: [product.id],
			name: "Order_productId_Product_id_fk"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const vendor = pgTable("Vendor", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	companyName: text().notNull(),
	cnpj: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("Vendor_companyName_unique").on(table.companyName),
	unique("Vendor_cnpj_unique").on(table.cnpj),
	unique("Vendor_email_unique").on(table.email),
]);

export const product = pgTable("Product", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
	category: text().notNull(),
	price: numeric({ precision: 10, scale:  2 }).notNull(),
	quantity: integer().notNull(),
	description: text(),
	image: text().notNull(),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	vendorId: uuid(),
	discount: numeric({ precision: 5, scale:  2 }),
}, (table) => [
	foreignKey({
			columns: [table.vendorId],
			foreignColumns: [vendor.id],
			name: "Product_vendorId_Vendor_id_fk"
		}).onUpdate("cascade").onDelete("set null"),
]);
