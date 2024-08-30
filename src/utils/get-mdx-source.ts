import { serialize } from "next-mdx-remote/serialize";
export async function getMdxSource(source: string | null) {
  return await serialize(source || "");
}
