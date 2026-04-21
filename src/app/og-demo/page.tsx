"use client";

import { useState } from "react";

export default function OgDemoPage() {
  const [title, setTitle] = useState("Hello World!");

  // Build the OG image URL with the title parameter
  const ogImageUrl = `/api/og?title=${encodeURIComponent(title)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-playfair text-3xl font-bold mb-6 text-foreground">
        OG Image Generator Demo
      </h1>

      <p className="text-muted mb-8">
        This demo showcases the <code className="bg-cream px-2 py-1 rounded">/api/og</code> route 
        that generates Open Graph images dynamically using Next.js.
      </p>

      {/* Input for dynamic title */}
      <div className="mb-8">
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Enter a title:
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
          placeholder="Your custom title..."
          maxLength={100}
        />
      </div>

      {/* Preview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Preview:</h2>
        <div className="border border-border rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ogImageUrl}
            alt="Generated OG Image"
            className="w-full"
          />
        </div>
      </div>

      {/* API URL */}
      <div className="bg-cream p-4 rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-2">API URL:</h3>
        <code className="text-sm text-muted break-all">{ogImageUrl}</code>
      </div>

      {/* Usage Instructions */}
      <div className="mt-12 prose prose-sm max-w-none">
        <h2 className="font-playfair text-xl font-bold text-foreground mb-4">How it works</h2>
        <ul className="space-y-2 text-muted">
          <li>
            <strong>1. API Route:</strong> The <code>/api/og</code> route uses Next.js built-in 
            <code>ImageResponse</code> from <code>next/og</code>.
          </li>
          <li>
            <strong>2. Dynamic Title:</strong> Pass a <code>?title=</code> query parameter to 
            customize the text in the image.
          </li>
          <li>
            <strong>3. Edge Runtime:</strong> Runs on the edge for fast image generation worldwide.
          </li>
          <li>
            <strong>4. Use in Metadata:</strong> Reference the URL in your page&apos;s Open Graph metadata 
            for social sharing.
          </li>
        </ul>
      </div>
    </div>
  );
}
