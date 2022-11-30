import Head from "next/head";

export interface SeoData {
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
}

export interface ISeoProps {
  data: SeoData;
}

export default function Seo({ data }: ISeoProps) {
  const { thumbnailUrl, title, description, url } = data;
  return (
    <Head>
      <title>akinha</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content="akinha" />
      <meta
        property="og:description"
        content="akinha website tìm kiếm và cho thuê phòng trọ miễn phí cho học sinh sinh viên"
      />
      <meta property="og:image" content={thumbnailUrl} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://metatags.io/" />
      <meta property="twitter:title" content="akinha" />
      <meta
        property="twitter:description"
        content="akinha website tìm kiếm và cho thuê phòng trọ miễn phí cho học sinh sinh viên"
      />
      <meta property="twitter:image" content={thumbnailUrl}></meta>
    </Head>
  );
}
