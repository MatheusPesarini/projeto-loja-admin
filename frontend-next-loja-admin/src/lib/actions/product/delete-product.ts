'use server';

import { getVendorId } from '@/lib/session/get-vendor-id';
import { type DeleteFormState, DeleteFormSchema } from '../definitions';

export async function submitDeleteProduct(
  prevState: DeleteFormState | undefined,
  data: FormData,
): Promise<DeleteFormState> {
  const vendorId = await getVendorId();

  if (!vendorId) {
    return {
      errors: { _form: ['Erro ao obter o ID do vendedor.'] },
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }
  // console.log('ID do vendedor:', vendorId);

  const validatedFields = DeleteFormSchema.safeParse({
    productName: data.get('productName'),
  });

  try {
    const deleteData = {
      vendorId: vendorId,
      productName: validatedFields.data?.productName,
    };

    console.log(`Enviando DELETE para http://localhost:3001/product/${vendorId}`);
    const productResponse = await fetch(`http://localhost:3001/product/${vendorId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deleteData),
    });

    const productResult = await productResponse.json();

    return {
      message: productResult.message,
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);

    return {
      errors: { _form: ['Erro ao deletar o produto.'] },
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }
}
