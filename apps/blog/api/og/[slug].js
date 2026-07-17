const BOT_UA =
  /bot|crawl|spider|facebookexternalhit|linkedinbot|twitterbot|slackbot|whatsapp|telegrambot|discordbot|embedly|quora|pinterest|redditbot|applebot/i;

export default async function handler(req, res) {
  const { slug } = req.query;

  const ua = req.headers["user-agent"] || "";
  if (!BOT_UA.test(ua)) {
    return res.redirect(301, `/posts/${slug}`);
  }

  const apiUrl = process.env.VITE_API_URL || process.env.API_URL;
  if (!apiUrl) {
    return res.redirect(301, `/posts/${slug}`);
  }

  try {
    const response = await fetch(`${apiUrl}/posts/${slug}`);
    if (!response.ok) {
      return res.redirect(301, `/posts/${slug}`);
    }

    const data = await response.json();
    const post = data.post;

    const title = escapeHtml(post.title || "The Safelight");
    const description = escapeHtml(
      post.excerpt ||
        stripHtml(post.content || "").slice(0, 160).trim() + "…"
    );
    const image = post.coverImage?.url || "";
    const siteUrl = `https://${req.headers.host}`;
    const postUrl = `${siteUrl}/posts/${slug}`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title} — The Safelight</title>
  <meta name="description" content="${description}" />

  <meta property="og:site_name" content="The Safelight" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${postUrl}" />
  ${image ? `<meta property="og:image" content="${image}" />` : ""}

  <meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  ${image ? `<meta name="twitter:image" content="${image}" />` : ""}

  <link rel="canonical" href="${postUrl}" />
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <a href="${postUrl}">Read on The Safelight</a>
</body>
</html>`);
  } catch {
    return res.redirect(301, `/posts/${slug}`);
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}
