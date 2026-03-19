import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
};

export default function Seo({ title, description, canonicalPath }: SeoProps) {
  const canonicalUrl =
    typeof window !== "undefined" && canonicalPath
      ? new URL(canonicalPath, window.location.origin).toString()
      : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}
      <meta property="og:title" content={title} />
      {description ? <meta property="og:description" content={description} /> : null}
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
    </Helmet>
  );
}

