import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

if (!accessKeyId || !secretAccessKey) {
  throw new Error("AWS credentials are missing from environment variables.");
}

// Initialize the S3 client
const S3 = new S3Client({
  endpoint:
    "https://1a0949cd3eaf56ee624088c536bf8c34.r2.cloudflarestorage.com/findwork",
  credentials: {
    accessKeyId: accessKeyId || "",
    secretAccessKey: secretAccessKey || "",
  },
  region: "auto",
});

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const id = v4();
      const url = await getSignedUrl(
        S3,
        new PutObjectCommand({
          Bucket: "findwork",
          Key: id,
        }),
        {
          expiresIn: 60 * 60,
        }
      );

      res.status(200).json({
        uploadUrl: url,
        accessUrls: `https://pub-4fcb83b95e974ee795416c419a508f67.r2.dev/findwork%2F${id}`,
      });
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      res.status(500).json({ error: "Failed to generate presigned URL" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
