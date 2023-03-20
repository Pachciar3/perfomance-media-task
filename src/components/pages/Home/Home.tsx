import Head from "next/head";
import Link from "next/link";
import { Routes } from "@/types/route";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Performance Media - recruitment task</title>
        <meta name="description" content="Integration with Starwars api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <h2>
            Show all starships <Link href={`${Routes.STARSHIPS}/1`}>here</Link>
          </h2>
        </div>
      </main>
    </>
  );
}
