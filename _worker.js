export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    
    if (url.pathname === "/check-login") {
      
      if (request.method === "OPTIONS") {
        return new Response(null, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        });
      }

      const botUrl = 'http://77.90.42.18:1025/api/check-login';
      const body = await request.text();

      try {
        const modifiedRequest = new Request(botUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: body
        });

        const response = await fetch(modifiedRequest);
        const responseText = await response.text();

        return new Response(responseText, {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: "Bot nicht erreichbar", details: error.message }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // Für alle anderen Seiten (index.html, regeln.html etc.) liefert Cloudflare die normalen Dateien aus
    return env.ASSETS.fetch(request);
  },
};
