import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://businessplanai.pro";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/features", "/pricing", "/blog", "/faq", "/contact"],
        disallow: ["/dashboard", "/admin", "/api/", "/create", "/plans"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
