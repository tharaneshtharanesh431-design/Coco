import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const CUSTOMER_SESSION_COOKIE_NAME = 'customer_session';

function getCustomerSecretKey() {
  const secret = process.env.JWT_SECRET_CUSTOMER;
  if (!secret) {
    throw new Error('JWT_SECRET_CUSTOMER is not configured in environment variables.');
  }
  return new TextEncoder().encode(secret);
}

export type CustomerJwtPayload = {
  userId: string;
  companyId: string;
  email: string;
  role: string;
};

export async function createCustomerSession(payload: CustomerJwtPayload) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
  const key = getCustomerSecretKey();
  
  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1d')
    .sign(key);

  const cookieStore = await cookies();
  cookieStore.set(CUSTOMER_SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires,
    path: '/',
  });
}

export async function getCustomerSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;
  if (!session) return null;

  try {
    const key = getCustomerSecretKey();
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as CustomerJwtPayload;
  } catch (error) {
    return null;
  }
}

export async function clearCustomerSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_SESSION_COOKIE_NAME);
}

export async function verifyCustomerSession(request: NextRequest) {
  const session = request.cookies.get(CUSTOMER_SESSION_COOKIE_NAME)?.value;
  if (!session) return null;

  try {
    const key = getCustomerSecretKey();
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as unknown as CustomerJwtPayload;
  } catch (error) {
    return null;
  }
}
