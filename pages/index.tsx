import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ tweetURL, twitter }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Testing SSR Cache</title>
        <meta
          name="description"
          content="An app to test how caching works with SSR"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={twitter.creator} />
        <meta name="twitter:title" content={twitter.title} />
        <meta name="twitter:description" content={twitter.description} />
        <meta name="twitter:image" content={twitter.image} />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          I sure hope this <a href="https://youtu.be/dQw4w9WgXcQ">caches</a>
        </h1>

        <p className={styles.description}>Imagine if it didn&apos;t tho</p>

        <aside>
          <blockquote className="twitter-tweet">
            <p lang="en" dir="ltr">
              AFAIK, you need to be explicit about the caching mechanism when
              going for a SSR-based solution.
              <br />
              <br />
              Netlify/Vercel/etc have made that a thing you don&#39;t even need
              to think or know about if you deliver static assets, which is
              typically the output of a SSG.
              <br />
              <br />
              What am I missing?
            </p>
            &mdash; marbiano (@marbiano3) <a href={tweetURL}>April 26, 2022</a>
          </blockquote>{" "}
          <script async src="https://platform.twitter.com/widgets.js"></script>
        </aside>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const tweetURL =
    "https://twitter.com/marbiano3/status/1518959655497650176?ref_src=twsrc%5Etfw";
  const twitter = {
    title: "My Sweet SSR Page",
    description: "I built this to see how well SSR HTML can be cached",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg",
    creator: "@lauchness1",
  };
  return {
    props: { tweetURL, twitter }, // will be passed to the page component as props
  };
}
