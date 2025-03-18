export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const number = searchParams.get('number');
    const API_KEY = process.env.API_NINJA_API_KEY;
    const phoneValidateUrl = `https://api.api-ninjas.com/v1/validatephone?number=+${number}`;

    try {
        const reponse = await fetch(phoneValidateUrl, {
            headers: {
                'X-Api-Key': API_KEY
            }
        });
        const data = await reponse.json();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
