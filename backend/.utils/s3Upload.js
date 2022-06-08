import { S3 } from "aws-sdk";
import { readFileSync } from "fs";

const s3Upload = async (filename, fn) => {
  try {
    const fileContent = readFileSync(filename);

    const s3 = new S3({
      accessKeyId: "AKIASCX6OE3GWCJLGENO",
      secretAccessKey: "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",
    });

    const params = {
      Bucket: "jenil1",
      Key: fn,
      Body: fileContent,
      ACL: "public-read",
      ContentType: "image/png",
    };

    const data = await s3.putObject(params).promise();
    return data;
  } catch (error) {
    return error.message;
  }
};

export default s3Upload;
