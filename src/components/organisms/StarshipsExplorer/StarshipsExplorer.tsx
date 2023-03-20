import { useState } from 'react';
import { Option } from 'react-multi-select-component';

import { Film } from '@/api/types/Film';
import { Starship } from '@/api/types/Starship';
import { getStarshipIdFromUrl } from '@/utils/getStarshipId';
import { Starship as StarshipEl } from '@/components/molecules/Starship';

import styles from './StarshipsExplorer.module.scss';
import ExplorerMultiSelect from './components/ExplorerMultiSelect';

export interface StarshipsExplorerProps {
  data?: Starship[] | null;
  films?: Film[] | null;
}

export default function StarshipsExplorer(props: StarshipsExplorerProps) {
  const { data, films } = props;
  const [selected, setSelected] = useState<Option[]>([]);

  const starships =
    data &&
    data
      .filter((starship: Starship) => {
        let show: boolean = true;
        if (selected.length) {
          show = false;
          selected.forEach((item: Option) => {
            if (starship.films.includes(item.value)) {
              show = true;
              return;
            }
          });
        }
        return show;
      })
      .map((starship: Starship) => {
        const id = Number(getStarshipIdFromUrl(starship.url));
        return <StarshipEl data={starship} linkId={id} key={starship.url} />;
      });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2 className={styles.title}>Explore Starships:</h2>
        <ExplorerMultiSelect
          setSelected={setSelected}
          selected={selected}
          films={films}
        />
      </div>

      <div className={styles.table}>
        {starships?.length ? starships : 'No data'}
      </div>
    </div>
  );
}
