import { relations } from "drizzle-orm/relations";
import { vendor, product, user, order, productSize, size } from "./schema";

export const productRelations = relations(product, ({one, many}) => ({
	vendor: one(vendor, {
		fields: [product.vendorId],
		references: [vendor.id]
	}),
	orders: many(order),
	productSizes: many(productSize),
}));

export const vendorRelations = relations(vendor, ({many}) => ({
	products: many(product),
}));

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

export const productSizeRelations = relations(productSize, ({one}) => ({
	product: one(product, {
		fields: [productSize.productId],
		references: [product.id]
	}),
	size: one(size, {
		fields: [productSize.sizeId],
		references: [size.id]
	}),
}));

export const sizeRelations = relations(size, ({many}) => ({
	productSizes: many(productSize),
}));