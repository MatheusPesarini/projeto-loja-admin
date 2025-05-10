import { Product, ProductFormState } from "../definitions";

export async function getProductId(productId: string): Promise<ProductFormState> {
  if (!productId) {
    console.error('ID do produto não fornecido.');
    return {
      errors: { _form: ['ID do produto não fornecido.'] },
      message: 'Erro de validação. Relogue novamente.',
      success: false,
    };
  }

  try {
    const productsResponse = await fetch(`http://localhost:3001/product/edit/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!productsResponse.ok) {
      console.error(
        'Erro ao obter produtos:',
        productsResponse.status,
        productsResponse.statusText,
      );
      let errorDetails = await productsResponse.text();
      console.error('Detalhes do erro:', errorDetails);

      return {
        errors: {
          _form: [
            `Erro ${productsResponse.status}: ${productsResponse.statusText || 'Erro desconhecido do servidor'}`,
          ],
        },
        message: 'Erro ao buscar produtos no servidor.',
        success: false,
      };
    }

    const productsResult = await productsResponse.json();

    console.log('Produtos obtidos com sucesso:', productsResult);

    const products: Product = Array.isArray(productsResult)
      ? productsResult
      : productsResult.data || [];

    return {
      message: 'Produtos obtidos com sucesso.', // Ou use productsResult.message se a API retornar uma
      success: true,
      errors: {},
      products: [products], // Retorne o array de produtos processado
    };
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    return {
      errors: { _form: ['Erro ao obter produtos.'] },
      message: 'Erro de validação. Relogue novamente.',
      success: false,
    };
  }
}