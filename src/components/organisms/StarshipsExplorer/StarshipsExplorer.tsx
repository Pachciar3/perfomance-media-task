import { useEffect, useState } from 'react';
import { Option } from 'react-multi-select-component';
import { useRouter } from 'next/router';

import { Film } from '@/api/types/Film';
import { Starship } from '@/api/types/Starship';
import { getStarshipIdFromUrl } from '@/utils/getStarshipId';
import { Starship as StarshipEl } from '@/components/molecules/Starship';
import { getAllStarships } from '@/api/methods/getAllStarships';

import styles from './StarshipsExplorer.module.scss';
import ExplorerMultiSelect from './components/ExplorerMultiSelect';
import Message from './components/Message';

export interface StarshipsExplorerProps {
  data?: Starship[] | null;
  films?: Film[] | null;
}

async function getStarshipsFromAllPages() {
  const all: Starship[] = [];
  async function nextPage(reqCount: number = 1) {
    const res = await getAllStarships(reqCount, undefined);
    res?.results?.forEach((starship: Starship) => {
      if (starship) {
        all.push(starship);
      }
    });
    if (res?.next) {
      reqCount++;
      await nextPage(reqCount);
    }
  }
  await nextPage();
  return all;
}

export default function StarshipsExplorer(props: StarshipsExplorerProps) {
  const { data, films } = props;
  const [selected, setSelected] = useState<Option[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<
    Starship[] | null | undefined
  >(data);
  const router = useRouter();

  const page = Number(router.query.page);
  useEffect(() => {
    if (selected.length) {
      setLoading(true);
      getStarshipsFromAllPages()
        .then((data) => {
          const filteredData = data.filter((starship: Starship) => {
            let show: boolean = true;
            if (selected.length) {
              show = false;
              selected.forEach((item: Option) => {
                if (starship.films.includes(item.value)) {
                  show = true;
                  return;
                }
              });
              return show;
            }
          });
          const splitedByPage = filteredData.slice((page - 1) * 10, page * 10);
          setFilteredData(splitedByPage);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    }
  }, [selected, data, page]);

  const starships = selected.length ? filteredData : data;
  const starshipsMap =
    starships &&
    starships.map((starship: Starship) => {
      const id = Number(getStarshipIdFromUrl(starship.url));
      return <StarshipEl data={starship} linkId={id} key={starship.url} />;
    });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Explore Starships:</h2>
        <ExplorerMultiSelect
          disabled={loading}
          setSelected={setSelected}
          selected={selected}
          films={films}
        />
      </div>
      <div className={styles.wrapper}>
        {loading && (
          <div className={styles.loading} title="loading..">
            <span className={styles.loader}>Loading...</span>
          </div>
        )}
        {starshipsMap?.length ? starshipsMap : <Message />}
      </div>
    </div>
  );
}
