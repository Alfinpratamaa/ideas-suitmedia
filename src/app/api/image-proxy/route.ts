// src/app/api/image-proxy/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    console.error("No image URL provided");
    return new NextResponse("No image URL provided", { status: 400 });
  }

  try {
    console.log("Fetching image from URL:", imageUrl);

    const response = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "image/*",
      },
    });

    if (response.status === 200) {
      const contentType =
        response.headers["content-type"] || "application/octet-stream";
      return new NextResponse(response.data, {
        headers: {
          "Content-Type": contentType,
        },
      });
    } else {
      console.error("Unexpected status code:", response.status);
      return new NextResponse("Failed to fetch image", {
        status: response.status,
      });
    }
  } catch (error: any) {
    console.error("Error fetching image:", {
      message: error.message,
      stack: error.stack,
      response: error.response
        ? {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data.toString(),
          }
        : undefined,
    });
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
