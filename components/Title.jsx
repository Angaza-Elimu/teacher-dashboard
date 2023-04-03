import Head from "next/head";

export default function Title({ children, name }) {
  return (
    <Head>
      <title>{`Teacher's Dashboard ${name && `- ${name}`}`}</title>
      {children}
    </Head>
  );
}
