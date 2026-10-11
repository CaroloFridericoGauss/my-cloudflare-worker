export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get('url');
    if (!targetUrl) return new Response('请提供目标URL', { status: 400 });

    // 关键：复制原始请求的头信息
    const newHeaders = new Headers(request.headers);
    // 如果原始请求没有，则设置一个常见的浏览器User-Agent
    if (!newHeaders.has('User-Agent')) {
      newHeaders.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
    // 移除可能暴露Worker身份的头
    newHeaders.delete('cf-worker');
    newHeaders.delete('cf-connecting-ip');

    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'follow',
    });

    return fetch(modifiedRequest);
  },
};
