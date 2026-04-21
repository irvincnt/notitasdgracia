import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get title from query params, with a default fallback
    // Example: /api/og?title=Hello%20World
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My default title";

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: "black",
            backgroundSize: "150px 150px",
            height: "100%",
            width: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="Vercel"
              height={200}
              src="data:image/svg+xml,<svg width='116' height='100' fill='white' xmlns='http://www.w3.org/2000/svg'><path d='M57.5 0L115 100H0L57.5 0z' /></svg>"
              style={{ margin: "0 30px" }}
              width={232}
            />
          </div>

          {/* Dynamic Title */}
          <div
            style={{
              fontSize: 60,
              fontStyle: "normal",
              letterSpacing: "-0.025em",
              color: "white",
              marginTop: 30,
              padding: "0 120px",
              lineHeight: 1.4,
              whiteSpace: "pre-wrap",
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    console.log(`${message}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
