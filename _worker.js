export default {
  async fetch(request, env) {
    const url = new URL(request.url
                        
    if (url.pathname === '/api/check-login') {
      const botUrl = 'http://77.90.42.18:1025/api/check-login';
      
      const modifiedRequest = new Request(botUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });

      return await fetch(modifiedRequest);
    }

    return env.ASSETS.fetch(request);
  }
};
