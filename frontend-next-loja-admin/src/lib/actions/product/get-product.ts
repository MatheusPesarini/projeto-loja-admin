import { getVendorId } from "@/lib/session/get-vendor-id";
import { ProductFormState } from "../definitions";

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
    const productsResponse = fetch(`http://localhost:3001/product/${vendorId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vendorId }),
    });

    const productsResult = await (await productsResponse).json();

    if (!(await productsResponse).ok) {
      console.error('Erro ao obter produtos:', productsResult.statusText);

      return {
        errors: { _form: ['Erro ao obter produtos.'] },
        message: 'Erro de validação. Relogue novamente.',
        success: false,
      };
    }

    console.log('Produtos obtidos com sucesso:', productsResult);
    return {
      message: productsResult.message,
      success: true,
      errors: {},
      products: productsResult,
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