export async function GET(request, { params }) {
  const code = params.code.toLowerCase();
  const flagUrl = `https://flagcdn.com/24x18/${code}.png`;

  try {
    const flagResponse = await fetch(flagUrl);

    if (!flagResponse.ok) {
      throw new Error("Flag not found");
    }

    const flagBuffer = await flagResponse.arrayBuffer();

    return new Response(flagBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    // Return default flag on error
    const defaultFlagUrl = "https://flagcdn.com/24x18/in.png";
    const defaultFlagResponse = await fetch(defaultFlagUrl);
    const defaultFlagBuffer = await defaultFlagResponse.arrayBuffer();

    return new Response(defaultFlagBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
