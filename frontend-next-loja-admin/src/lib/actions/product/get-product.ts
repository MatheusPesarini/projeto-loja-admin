import { getVendorId } from "@/lib/session/get-vendor-id";
import { Product, ProductFormState } from "../definitions";

export async function getProduct(): Promise<ProductFormState> {
  const vendorId = await getVendorId();

  if (!vendorId) {
    return {
      errors: { _form: ['Erro ao obter o ID do vendedor.'] },
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }
  console.log('ID do vendedor:', vendorId);

  try {
    const productsResponse = await fetch(`http://localhost:3001/product/${vendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!productsResponse.ok) {
      // 3. Logue o status e statusText da RESPOSTA
      console.error(
        'Erro ao obter produtos:',
        productsResponse.status,
        productsResponse.statusText,
      );
      // Tente ler o corpo do erro para mais detalhes, se possível
      let errorDetails = await productsResponse.text(); // Ler como texto primeiro
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

    const products: Product[] = Array.isArray(productsResult)
      ? productsResult
      : productsResult.data || []; 

    return {
      message: 'Produtos obtidos com sucesso.', // Ou use productsResult.message se a API retornar uma
      success: true,
      errors: {},
      products: products, // Retorne o array de produtos processado
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