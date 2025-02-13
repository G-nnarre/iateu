import { NextRequest, NextResponse } from "next/server";
import { container } from '@/infrastructure/container'
import { TokenService } from "@/core/services/tokenService";

const tokenService = container.resolve<TokenService>('TokenService');

interface CustomNextRequest extends NextRequest {
  tokenData?: unknown; // TODO : Remplace `unknown` par un type précis si possible
}

export async function middleware(req:CustomNextRequest){
  const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const tokenData = tokenService.verify(token);

  if (!tokenData){
    return new NextResponse('Invalid or expired token', { status: 401 });
  }

  req.tokenData = tokenData;

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/*', '!/api/auth/login', '!/api/auth/signin'],
}