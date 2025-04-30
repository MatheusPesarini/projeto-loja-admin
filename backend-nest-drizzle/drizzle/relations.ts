import { relations } from "drizzle-orm/relations";
import { user, order, product, vendor } from "./schema";

export const orderRelations = relations(order, ({one}) => ({
	user: one(user, {
		fields: [order.userId],
		references: [user.id]
	}),
	product: one(product, {
		fields: [order.productId],
		references: [product.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	orders: many(order),
}));

export const productRelations = relations(product, ({one, many}) => ({
	orders: many(order),
	vendor: one(vendor, {
		fields: [product.vendorId],
		references: [vendor.id]
	}),
}));

export const vendorRelations = relations(vendor, ({many}) => ({
	products: many(product),
}));