export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) {
      return new Response('请提供目标URL，格式：?url=https://example.com', { status: 400 });
    }
    return fetch(targetUrl, request);
  },
};
