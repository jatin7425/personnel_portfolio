import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pin = body?.pin;
    const correct = process.env.NEXT_PUBLIC_ADMIN_PIN || '123456';
    if (pin === correct) {
      const res = NextResponse.json({ ok: true });
      // set httpOnly cookie valid for 1 day
      res.cookies.set('admin_auth', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });
      return res;
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err) {
    console.error('admin login error', err);
    return NextResponse.json({ error: 'login failed' }, { status: 500 });
  }
}
