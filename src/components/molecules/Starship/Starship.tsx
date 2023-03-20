import Link from 'next/link';
import { memo } from 'react';

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
      <Link href={`${Routes.STARSHIP}/${linkId}`}>
        <div className={styles.root__content}>
          <h2>{data.name}</h2>
          <p>
            <span>Model:</span> {data.model}
          </p>
          <p>
            <span>Manufacturer:</span> {data.manufacturer}
          </p>
          <p>
            <span>Starship class:</span> {data.starship_class}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default memo(Starships);
