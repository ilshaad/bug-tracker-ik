import React from "react";
import { Helmet } from "react-helmet";

type Props = {
  pageTitle: string;
  metaDescriptionContent: string;
  metaKeywordsContent: string;
};

export default function SeoReactHelmet({
  pageTitle,
  metaDescriptionContent,
  metaKeywordsContent,
}: Props) {
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescriptionContent} />
      <meta name="keywords" content={metaKeywordsContent} />
    </Helmet>
  );
}
