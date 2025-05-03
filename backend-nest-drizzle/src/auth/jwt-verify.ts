import * as jwt from 'jsonwebtoken';

interface JwtPayload {
  vendorId: string; 
}

export class JwtVerify {
  /**
   * Verifica um token JWT usando uma chave secreta.
   * Retorna o payload decodificado se o token for válido e não expirado.
   * Lança um erro (JsonWebTokenError, TokenExpiredError, etc.) se a verificação falhar.
   * Retorna null se o token ou a chave secreta não forem fornecidos.
   *
   * @param token O token JWT a ser verificado.
   * @param secret A chave secreta usada para assinar o token.
   * @returns O payload decodificado ou null.
   * @throws {Error} Se a verificação falhar (assinatura inválida, token expirado, etc.).
   */
  static verifyToken(vendorId: string | undefined | null, secret: string | undefined | null): JwtPayload | null {
    if (!vendorId || !secret) {
      console.error("Token ou chave secreta não fornecidos para verificação.");
      return null; 
    }

    try {
      const decodedPayload = jwt.verify(vendorId, secret) as JwtPayload;
      return decodedPayload;
    } catch (error) {
      console.error("Falha na verificação do token:", error.message);
      return null; 
    }
  }
}