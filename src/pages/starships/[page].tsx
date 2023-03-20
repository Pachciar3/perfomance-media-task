import { GetStaticProps } from 'next';

import { RootLayout } from '@/layouts/RootLayout';
import { getAllStarships } from '@/api/methods/getAllStarships';
import { StarshipsResponse } from '@/api/methods/getAllStarships';
import getAllFilms from '@/api/methods/getAllFilms/getAllFilms';
import { FilmsResponse } from '@/api/methods/getAllFilms/FilmsResponse';
import { Starships } from '@/components/pages/Starships';

interface StarshipsPageProps {
  starships: StarshipsResponse | undefined;
  films: FilmsResponse | undefined;
}

export default function StarshipsPage(props: StarshipsPageProps) {
  const { starships, films } = props;
  return (
    <RootLayout>
      <Starships starships={starships} films={films} />
    </RootLayout>
  );
}

export async function getStaticPaths() {
  const res = await getAllStarships(undefined, undefined);
  const pages = res?.count ? Math.ceil(res.count / 10) : 1;
  const paths = [];
  for (let i = 1; i <= pages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<StarshipsPageProps> = async (
  context,
) => {
  const starships = await getAllStarships(
    context.params ? Number(context.params.page) : 1,
    undefined,
  );
  const films = await getAllFilms();

  return {
    props: {
      starships,
      films,
    },
  };
};
