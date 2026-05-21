import { HomePage } from "@/components/HomePage";
import { buildHomeMetadata } from "@/lib/seo";

export const metadata = buildHomeMetadata();

export default function Page() {
  return <HomePage />;
}
