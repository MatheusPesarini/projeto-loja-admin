export const initialState = {
  success: false,
  message: '',
  errors: {},
};

export const productCategoriesByGenre: Record<string, Array<{ value: string; label: string }>> = {
  masculino: [
    { value: 'camisetas_masculinas', label: 'Camisetas Masculinas' },
    { value: 'calcas_masculinas', label: 'Calças Masculinas' },
    { value: 'moletons_masculinos', label: 'Moletons Masculinos' },
    { value: 'tenis_masculinos', label: 'Tênis Masculinos' },
  ],
  feminino: [
    { value: 'blusas_femininas', label: 'Blusas Femininas' },
    { value: 'saias_femininas', label: 'Saias Femininas' },
    { value: 'vestidos', label: 'Vestidos' },
    { value: 'tenis_feminino', label: 'Tênis Feminino' },
  ],
  infantil: [
    { value: 'camisetas_infantis', label: 'Acessórios Infantis' },
    { value: 'calcados_infantis', label: 'Calçados Infantis' },
  ],
};

export const genreCategories = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'infantil', label: 'Infantil' },
]