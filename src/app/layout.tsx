import type { Metadata } from "next";
import "./globals.css";
import { siteContent } from "@/content/siteContent";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FloatingActions } from "@/components/ui/FloatingActions";

export const metadata: Metadata = {
  title: "Dream Byte Studio | Photo, Video, Podcast & Wedding Studio in Dehradun",
  description:
    "Dream Byte Studio is Dehradun's premier photo, video, podcast, and wedding production facility. Located on Sahastradhara Road near IT Park. Top-tier equipment and creative excellence.",
  keywords: [
    "Dream Byte Studio",
    "photo studio Dehradun",
    "video production Dehradun",
    "podcast studio Dehradun",
    "wedding shoot Dehradun",
    "Sahastradhara Road studio",
    "Dream Byte Solutions",
    "Uttarakhand photography studio"
  ],
  authors: [{ name: "Dream Byte Studio" }],
  creator: "Dream Byte Solutions Pvt. Ltd.",
  metadataBase: new URL("https://dreambytestudio.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dreambytestudio.in",
    siteName: "Dream Byte Studio",
    title: "Dream Byte Studio | Photo, Video, Podcast & Wedding Studio in Dehradun",
    description:
      "Where Your Imagination is our innovation. Turn your moments into lasting memories with top-tier equipment and creative precision in Dehradun.",
    images: [
      {
        url: "/assets/images/P1095305.webp",
        width: 1200,
        height: 630,
        alt: "Dream Byte Studio Production Floor in Dehradun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Byte Studio | Photo, Video, Podcast & Wedding Studio in Dehradun",
    description:
      "Where Your Imagination is our innovation. High-end photo, 4K video, broadcast podcast and wedding production in Dehradun.",
    images: ["/assets/images/P1095305.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Schema for PhotographyBusiness / LocalBusiness
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["PhotographyBusiness", "LocalBusiness"],
    "name": siteContent.brand.name,
    "legalName": siteContent.brand.parentCompany,
    "image": "https://dreambytestudio.in/assets/images/P1095305.webp",
    "logo": "https://dreambytestudio.in/assets/logos/DREAM_BYTE_STUDIO_VERTICAL-02.png",
    "url": "https://dreambytestudio.in",
    "telephone": siteContent.contact.primaryPhoneTel,
    "email": siteContent.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3rd Floor, above Bank of India, Sahastradhara Road, Near IT Park",
      "addressLocality": "Dehradun",
      "addressRegion": "Uttarakhand",
      "postalCode": "248013",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 30.3164945,
      "longitude": 78.0321918
    },
    "sameAs": [
      siteContent.contact.socials.instagram.url,
      siteContent.contact.socials.youtube.url,
      siteContent.contact.socials.linkedin.url,
      siteContent.contact.socials.facebook.url
    ],
    "description": "Production studio in Dehradun offering photo shoots, videography, podcast recording, and wedding shoots with top-tier equipment.",
    "parentOrganization": {
      "@type": "Organization",
      "name": siteContent.brand.parentCompany
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#07070A] text-white selection:bg-[#FFDB59] selection:text-black">
        {/* Subtle Film Grain Texture Overlay */}
        <div className="film-grain" />

        {/* Custom Focus Reticle Cursor */}
        <CustomCursor />

        {/* Smooth Scroll Container */}
        <SmoothScroll>
          {children}
          <FloatingActions />
        </SmoothScroll>
      </body>
    </html>
  );
}
