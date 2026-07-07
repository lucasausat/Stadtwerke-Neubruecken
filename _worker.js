export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/check-login' || url.pathname === '/api/check-login/') {
      
      
      const targetUrl = `http://77.90.42.18:1025/check-login`;
      
      const newHeaders = new Headers(request.headers);
      newHeaders.set("Host", "77.90.42.18:1025");

      const newRequest = new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body
      });

      try {
        const response = await fetch(newRequest);
        return response;
      } catch (err) {
        return new Response(JSON.stringify({ 
          status: "error", 
          message: `Bot nicht erreichbar: ${err.message}` 
        }), {
          status: 502,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
