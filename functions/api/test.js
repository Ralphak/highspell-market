export function onRequest(context) {
  return new Response(JSON.stringify({message: "API is working!", context}));
}