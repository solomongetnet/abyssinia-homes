import path from "path";
import cloudinary from "../config/cloudinary";
import url from "url";

export const uploader = async (path: any, folder: string) =>
  await cloudinary.uploader.upload(path, { folder });

// Function to extract public_id from secure_url
export const extractPublicIdFromUrl = (
  secureUrl: string,
  folderName?: string
): string | null => {
  const parsedUrl: any = url.parse(secureUrl);
  const pathComponents = parsedUrl.pathname.split("/");
  // The public_id in Cloudinary is typically the second last component in the path
  if (pathComponents.length >= 2) {
    const witouthExt = path.basename(
      pathComponents[pathComponents.length - 1],
      path.extname(pathComponents[pathComponents.length - 1])
    );
    return folderName + "/" + witouthExt;
  } else {
    return null;
  }
};
