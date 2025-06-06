export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = url.searchParams.get("url");
    if (!target) {
      return new Response("Tambahkan parameter ?url=URL_TARGET", { status: 400 });
    }
    try {
      const res = await fetch(target, {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      const headers = new Headers(res.headers);
      headers.set("Access-Control-Allow-Origin", "*");

      return new Response(res.body, {
        status: res.status,
        statusText: res.statusText,
        headers
      });
    } catch (err) {
      return new Response("Gagal fetch: " + err.message, { status: 500 });
    }
  }
}
