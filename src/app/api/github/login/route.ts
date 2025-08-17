import { NextResponse } from "next/server";

const CLIENT_ID = process.env.GITHUB_CLIENT_ID || "";

export async function GET(req: Request) {
    const host = req.headers.get("host"); // e.g., localhost:3000
    const protocol = req.headers.get("x-forwarded-proto") || "http"; // handle Vercel/proxy

    const baseUrl = `${protocol}://${host}`;
    const redirectUri = `${baseUrl}/admin/syncgithubrepos`;

    const githubUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo&redirect_uri=${redirectUri}`;
    return NextResponse.redirect(githubUrl);
}
