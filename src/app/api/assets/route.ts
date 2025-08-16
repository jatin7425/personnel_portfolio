import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
    const assetsDir = path.join(process.cwd(), 'src', 'assets');
    const files = fs.readdirSync(assetsDir);
    const assets = files.map((file, idx) => ({
        id: idx + 1,
        name: file,
        type: path.extname(file).replace('.', ''),
        url: `/api/assets/${file}`,
    }));

    // Serve the actual image file if requested
    const url = new URL(request.url);
    const imageName = url.pathname.split('/api/assets/')[1];
    if (imageName && files.includes(imageName)) {
        const imagePath = path.join(assetsDir, imageName);
        const imageBuffer = fs.readFileSync(imagePath);
        const ext = path.extname(imageName).replace('.', '');
        return new Response(imageBuffer, {
            headers: { 'Content-Type': `image/${ext}` },
        });
    }

    // HTML response for browser
    const htmlrespose = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Assets</title>
      </head>
      <body>
        <h1>Assets List</h1>
        <ul>
          ${assets.map(asset => `<li>${asset.name} (${asset.type}) - <a href="${asset.url}">Download</a></li>`).join('')}
        </ul>
      </body>
      </html>`;

    if (request.headers.get('Accept')?.includes('text/html')) {
        return new Response(htmlrespose, {
            headers: { 'Content-Type': 'text/html' },
        });
    }

    // Return JSON response for API requests
    if (request.headers.get('Accept')?.includes('application/json')) {
        return NextResponse.json({ assets });
    }

    // Default to JSON response
    return NextResponse.json({ message: 'Unsupported Accept header. Please use application/json or text/html.' }, {
        status: 406,
        headers: { 'Content-Type': 'application/json' },
    });
}