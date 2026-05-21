export { seoConfig, absoluteUrl } from "@/config/seo";
export { buildHomeMetadata, buildRootMetadata } from "./metadata";
export {
  getAllJsonLd,
  getCoachingPlansItemListJsonLd,
  getFaqPageJsonLd,
  getJsonLdScriptId,
  getPersonJsonLd,
  getProfessionalServiceJsonLd,
  getWebPageJsonLd,
  getWebSiteJsonLd,
} from "./json-ld";

/** @deprecated Use getPersonJsonLd — kept for backwards compatibility */
export { getPersonJsonLd as getOrganizationJsonLd } from "./json-ld";
/** @deprecated Use getProfessionalServiceJsonLd */
export { getProfessionalServiceJsonLd as getServiceJsonLd } from "./json-ld";
