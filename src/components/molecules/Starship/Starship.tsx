import { memo } from 'react';

import { InternalLink } from '@/components/atoms/InternalLink';
import { Starship } from '@/api/types/Starship';
import { Routes } from '@/types/route';

import styles from './Starship.module.scss';

export interface StarshipProps {
  data: Starship;
  linkId: number;
}

function Starships(props: StarshipProps) {
  const { data, linkId } = props;

  return (
    <div className={styles.root} key={data.url}>
      <InternalLink href={`${Routes.STARSHIP}/${linkId}`}>
        <div className={styles.root__content}>
          <h2 className={styles.title}>{data.name}</h2>
          <ul className={styles.list}>
            <li className={styles.item}>
              <span className={styles.name}>Model:</span>
              {data.model}
            </li>
            <li className={styles.item}>
              <span className={styles.name}>Manufacturer:</span>
              {data.manufacturer}
            </li>
            <li className={styles.item}>
              <span className={styles.name}>Starship class:</span>
              {data.starship_class}
            </li>
          </ul>
        </div>
      </InternalLink>
    </div>
  );
}

export default memo(Starships);
