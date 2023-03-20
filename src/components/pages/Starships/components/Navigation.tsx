import { Routes } from "@/types/route";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navigation.module.scss";

export interface StarshipsProps {
  next?: string | null;
  previous?: string | null;
}

export default function Starships(props: StarshipsProps) {
  const { next, previous } = props;

  const router = useRouter();
  const page =
    typeof router.query.page === "string"
      ? Number(router.query.page)
      : undefined;

  return (
    <div className={styles.root}>
      {previous && page && (
        <Link
          className={styles.root__left}
          href={`${Routes.STARSHIPS}/${page - 1}`}
        >
          Previous page
        </Link>
      )}
      {next && page && (
        <Link
          className={styles.root__right}
          href={`${Routes.STARSHIPS}/${page + 1}`}
        >
          Next page
        </Link>
      )}
    </div>
  );
}
