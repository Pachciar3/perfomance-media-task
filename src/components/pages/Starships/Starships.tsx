import Head from 'next/head';
import clsx from 'clsx';

import { FilmsResponse } from '@/api/methods/getAllFilms/FilmsResponse';
import { StarshipsResponse } from '@/api/methods/getAllStarships';
import { SearchBox } from '@/components/organisms/SearchBox';
import { StarshipsExplorer } from '@/components/organisms/StarshipsExplorer';
import containerStyles from '@/components/atoms/Container/Container.module.scss';

import Navigation from './components/Navigation';
import styles from './Starships.module.scss';

export interface StarshipsProps {
  starships?: StarshipsResponse;
  films?: FilmsResponse;
}

export default function Starships(props: StarshipsProps) {
  const { starships, films } = props;

  return (
    <>
      <Head>
        <title>Performance Media - recruitment task</title>
        <meta name="description" content="Integration with Starwars api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={clsx(containerStyles.root, styles.main)}>
        <SearchBox />
        <StarshipsExplorer data={starships?.results} films={films?.results} />
        <Navigation next={starships?.next} previous={starships?.previous} />
      </main>
    </>
  );
}
