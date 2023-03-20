import { FilmsResponse } from "@/api/methods/getAllFilms/FilmsResponse";
import { StarshipsResponse } from "@/api/methods/getAllStarships";
import { SearchBox } from "@/components/molecules/SearchBox";
import { Starships as StarshipsTable } from "@/components/organisms/Starships";
import { Routes } from "@/types/route";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Starships.module.scss";

export interface StarshipsProps {
  starships?: StarshipsResponse;
  films?: FilmsResponse;
}

export default function Starships(props: StarshipsProps) {
  const { starships, films } = props;
  const router = useRouter();
  const page =
    typeof router.query.page === "string"
      ? Number(router.query.page)
      : undefined;
  return (
    <>
      <Head>
        <title>Performance Media - recruitment task</title>
        <meta name="description" content="Integration with Starwars api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <SearchBox />
        <StarshipsTable data={starships?.results} films={films?.results} />
        <div className={styles.navigation}>
          {starships?.previous && page && (
            <Link
              className={styles.navigation__left}
              href={`${Routes.STARSHIPS}/${page - 1}`}
            >
              Previous page
            </Link>
          )}
          {starships?.next && page && (
            <Link
              className={styles.navigation__right}
              href={`${Routes.STARSHIPS}/${page + 1}`}
            >
              Next page
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
