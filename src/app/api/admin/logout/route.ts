import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const cookieOpts: any = { httpOnly: true, path: '/', maxAge: 0 };
  if (process.env.NODE_ENV === 'production') {
    cookieOpts.secure = true;
    cookieOpts.sameSite = 'lax';
  }
  res.cookies.set('admin_auth', '', cookieOpts);
  return res;
}
