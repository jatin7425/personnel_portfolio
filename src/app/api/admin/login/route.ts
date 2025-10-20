import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pin = body?.pin;
    // use a server-only env var for the admin PIN
    const correct = process.env.ADMIN_PIN || '123456';
    if (pin === correct) {
      const res = NextResponse.json({ ok: true });
      // cookie settings: httpOnly, path=/, 1 day expiry
      const cookieOpts: any = { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 };
      // in production, secure should be true and set sameSite
      if (process.env.NODE_ENV === 'production') {
        cookieOpts.secure = true;
        cookieOpts.sameSite = 'lax';
      }
      res.cookies.set('admin_auth', '1', cookieOpts);
      return res;
    }
    return NextResponse.json({ ok: false }, { status: 401 });
  } catch (err) {
    console.error('admin login error', err);
    return NextResponse.json({ error: 'login failed' }, { status: 500 });
  }
}
