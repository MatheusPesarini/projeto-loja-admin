export const initialState = {
	success: false,
	message: '',
	errors: {},
};

export const productCategoriesByGenre: Record<
	string,
	Array<{ value: string; label: string }>
> = {
	masculino: [
		{ value: 'camisetas_masculinas', label: 'Camisetas Masculinas' },
		{ value: 'calcas_masculinas', label: 'Calças Masculinas' },
		{ value: 'cuecas_masculinas', label: 'Cuecas Masculinas' },
		{ value: 'tenis_masculinos', label: 'Tênis Masculinos' },
	],
	feminino: [
		{ value: 'calcas_femininas', label: 'Calças Femininas' },
		{ value: 'bolsas_femininas', label: 'Bolsas Femininas' },
		{ value: 'camisetas_femininas', label: 'Camisetas Femininas' },
		{ value: 'tenis_femininos', label: 'Tênis Femininos' },
	],
	infantil: [
		{ value: 'calcas_kids', label: 'Calças Infantis' },
		{ value: 'camisetas_kids', label: 'Camisetas Infantis' },
		{ value: 'brinquedos_kids', label: 'Brinquedos Infantis' },
		{ value: 'tenis_kids', label: 'Tênis Infantis' },
	],
};

export const genreCategories = [
	{ value: 'masculino', label: 'Masculino' },
	{ value: 'feminino', label: 'Feminino' },
	{ value: 'infantil', label: 'Infantil' },
];
