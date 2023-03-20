import { GetStaticProps } from 'next/types';

import { RootLayout } from '@/layouts/RootLayout';
import { StarshipDetails } from '@/components/pages/StarshipDetails';
import { getStarship } from '@/api/methods/getStarship';
import { Starship } from '@/api/types/Starship';
import { getAllStarships } from '@/api/methods/getAllStarships';
import { getStarshipIdFromUrl } from '@/utils/getStarshipId';

interface StarshipDetailsPageProps {
  starship: Starship | undefined;
}

export default function StarshipDetailsPage(props: StarshipDetailsPageProps) {
  const { starship } = props;
  return (
    <RootLayout>
      {starship && <StarshipDetails data={starship} />} {!starship && '404'}
    </RootLayout>
  );
}
async function getAllIds() {
  const allIds: { params: { id: string } }[] = [];
  async function nextPage(reqCount: number = 1) {
    const res = await getAllStarships(reqCount, undefined);
    res?.results?.forEach((starship: Starship) => {
      if (starship) {
        allIds.push({
          params: {
            id: getStarshipIdFromUrl(starship.url),
          },
        });
      }
    });
    if (res?.next) {
      reqCount++;
      await nextPage(reqCount);
    }
  }
  await nextPage();
  return allIds;
}

export async function getStaticPaths() {
  const ids = await getAllIds();
  return {
    paths: [...ids],
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps<StarshipDetailsPageProps> = async (
  context,
) => {
  const res = context.params && (await getStarship(Number(context.params.id)));
  return {
    props: {
      starship: res,
    },
  };
};
