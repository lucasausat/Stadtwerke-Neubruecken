export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    
    if (url.pathname.startsWith('/api/')) {
      
      const targetUrl = `http://77.90.42.18:1025${url.pathname}${url.search}`;
      
      
      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });

      try {
        return await fetch(newRequest);
      } catch (err) {
        return new Response(JSON.stringify({ error: "Bot-Server nicht erreichbar", details: err.message }), {
          status: 502,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Für alle normalen Seiten (index.html, CSS, etc.) Standard-Verhalten von Cloudflare Pages nutzen
    return env.ASSETS.fetch(request);
  },
};
