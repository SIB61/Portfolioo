import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION || "us-east-2";

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || "media";

const globalForS3 = globalThis as unknown as {
  s3Client: S3Client | undefined;
};

function createS3Client(): S3Client {
  if (!accessKeyId || !secretAccessKey || !endpoint) {
    throw new Error(
      "Missing AWS S3 configuration in environment variables (AWS_ENDPOINT_URL_S3, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)"
    );
  }

  return new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true,
  });
}

export const s3Client = globalForS3.s3Client ?? createS3Client();

if (process.env.NODE_ENV !== "production") {
  globalForS3.s3Client = s3Client;
}

/**
 * Generate a pre-signed URL for direct client-side uploads.
 */
export async function getSignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn = 3600
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Generate a pre-signed URL for viewing/downloading an object.
 */
export async function getSignedDownloadUrl(
  key: string,
  expiresIn = 3600
): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
}

/**
 * Upload an object directly from the server.
 */
export async function uploadFile(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType?: string
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  return s3Client.send(command);
}

/**
 * Delete an object from storage.
 */
export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  return s3Client.send(command);
}

/**
 * Construct the public/direct URL for an object key.
 */
export function getPublicUrl(key: string): string {
  const cleanEndpoint = endpoint?.replace(/\/$/, "");
  return `${cleanEndpoint}/${BUCKET_NAME}/${key}`;
}

export default s3Client;
