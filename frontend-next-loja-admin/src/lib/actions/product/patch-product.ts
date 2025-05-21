'use server';

import { getVendorId } from '@/lib/session/get-vendor-id';
import { FileSchema, ProductFormState, ProductFormSchema } from '../definitions';

export async function submitUpdateProduct(
  prevState: ProductFormState | undefined,
  data: FormData,
): Promise<ProductFormState> {
  const vendorId = await getVendorId();
  const currentImageUrl = data.get('currentImageUrl')?.toString();

  if (!vendorId) {
    return {
      errors: { _form: ['Erro ao obter o ID do vendedor.'] },
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }
  // console.log('ID do vendedor:', vendorId);

  const validatedFields = ProductFormSchema.safeParse({
    oldProductId: data.get('productId'),
    productName: data.get('productName'),
    brand: data.get('brand'),
    model: data.get('model'),
    category: data.get('category'),
    quantity: data.get('quantity'),
    originalPrice: data.get('originalPrice'),
    discount: data.get('discount'),
    description: data.get('description'),
    vendorId: vendorId,
  });


  if (!validatedFields.success) {
    console.log('Erro: Falha na validação dos campos.', validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }

  let imageUrl = currentImageUrl || null;
  let newImageUploaded = false;

  const imageFile = data.get('image') as File;

  if (imageFile && imageFile.size > 0) {
    const validatedImage = FileSchema.safeParse(imageFile);
    if (!validatedImage.success) {
      console.log('Erro: Falha na validação da imagem.', validatedImage.error.flatten());
      return {
        errors: { image: validatedImage.error.flatten().formErrors },
        message: 'Erro de validação. Verifique os campos destacados.',
        success: false,
      };
    }

    console.log('Tentando upload da nova imagem...');

    try {
      const imageFormData = new FormData();
      imageFormData.append('image', validatedImage.data);

      const imageUploadResponse = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: imageFormData,
      });

      if (!imageUploadResponse.ok) {
        return {
          errors: { image: ['Erro ao fazer upload da imagem.'] },
          message: 'Erro de validação. Verifique os campos destacados.',
          success: false,
        };
      }

      console.log('Upload da nova imagem concluído.');
      const imageResult = await imageUploadResponse.json();
      imageUrl = imageResult.imageUrl;
      newImageUploaded = true;
    } catch (error: unknown) {
      console.error('Erro no upload da imagem:', error);
      return {
        errors: { image: ['Erro ao fazer upload da imagem.'] },
        message: 'Erro de validação. Verifique os campos destacados.',
        success: false,
      };
    }
  } else {
    console.log('Nenhuma nova imagem enviada, mantendo a atual:', imageUrl);
  }

  try {
    let discountedPrice = validatedFields.data.originalPrice;

    if (validatedFields.data.discount !== 0 && validatedFields.data.discount !== undefined) {
      discountedPrice = parseFloat(
        (
          (validatedFields.data.originalPrice as number) *
          (1 - (validatedFields.data.discount as number) / 100)
        ).toFixed(2)
      );
    }

    const validatedFieldsWithImage = {
      ...validatedFields.data,
      discountedPrice, 
      image: imageUrl,
      vendorId: vendorId,
    };

    console.log(`Enviando PATCH para http://localhost:3001/product/${vendorId}`);
    const productResponse = await fetch(`http://localhost:3001/product/${vendorId}`, {
      method: 'PATCH',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFieldsWithImage),
    });

    const productResult = await productResponse.json();

    if (!productResponse.ok) {
      if (newImageUploaded && imageUrl) {
        try {
          console.log('Deletando imagem após erro na atualização do produto');
          const deletedImage = await fetch('http://localhost:4000/delete-image', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl }),
          });

          if (!deletedImage.ok) {
            console.error('Erro ao deletar a imagem');
          } else {
            console.log('Imagem deletada com sucesso.');
          }
        } catch (deleteError) {
          console.error('Erro ao deletar imagem:', deleteError);
        }
      }

      return {
        errors: { _form: [productResult.message || 'Erro desconhecido'] },
        message: 'Erro ao atualizar o produto. Tente novamente.',
        success: false,
      };
    }

    return {
      message: productResult.message,
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error('Erro ao criar o produto:', error);

    if (newImageUploaded && imageUrl) {
      try {
        console.log('Deletando imagem após erro na atualização do produto');
        const deletedImage = await fetch('http://localhost:4000/delete-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl }),
        });

        if (!deletedImage.ok) {
          console.error('Erro ao deletar a imagem');
        } else {
          console.log('Imagem deletada com sucesso.');
        }
      } catch (deleteError) {
        console.error('Erro ao deletar imagem:', deleteError);
      }
    }

    return {
      errors: { _form: ['Erro ao criar o produto.'] },
      message: 'Erro de validação. Verifique os campos destacados.',
      success: false,
    };
  }
}
