import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

const accessKeyId = "b2f737472419663361e716b67fae9b0c";
const secretAccessKey =
  "47ae4033ca85f963abd5a9882510d753ea7b718cb32e8b2930dd5d6be7ac2324";

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are missing from environment variables.");
}

const S3 = new S3Client({
  endpoint:
    "https://1a0949cd3eaf56ee624088c536bf8c34.r2.cloudflarestorage.com/findwork",
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
  region: "auto",
});

export async function GET(req: NextRequest) {
  try {
    const id = v4();
    const url = await getSignedUrl(
      S3,
      new PutObjectCommand({
        Bucket: "findwork",
        Key: id,
      }),
      {
        expiresIn: 60 * 60, // 1 hour
      }
    );
    return NextResponse.json({
      uploadUrl: url,
      accessUrls: `https://pub-4fcb83b95e974ee795416c419a508f67.r2.dev/findwork%2F${id}`,
    });
  } catch (error) {
    // Return an error response
    return NextResponse.json(
      { message: "Failed to generate presigned URL" },
      { status: 500 }
    );
  }
}
