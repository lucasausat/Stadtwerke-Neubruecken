export async function onRequest(context) {
  const { request } = context;
  const botUrl = 'http://77.90.42.18:1025/api/check-login';
  

  const body = await request.text();

  const modifiedRequest = new Request(botUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body
  });

  const response = await fetch(modifiedRequest);
  

  return new Response(response.body, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
