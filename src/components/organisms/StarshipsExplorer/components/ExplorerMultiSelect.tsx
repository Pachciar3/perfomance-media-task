import { Dispatch, SetStateAction, useCallback } from 'react';
import { MultiSelect, Option } from 'react-multi-select-component';

import { Film } from '@/api/types/Film';

import styles from './ExplorerMultiSelect.module.scss';

export interface ExplorerMultiSelectProps {
  films?: Film[] | null;
  selected: Option[];
  disabled: boolean;
  setSelected: Dispatch<SetStateAction<Option[]>>;
}

export default function ExplorerMultiSelect(props: ExplorerMultiSelectProps) {
  const { films, selected, setSelected, disabled } = props;

  const handleChange = useCallback(
    (options: Option[]) => {
      setSelected(options);
    },
    [setSelected],
  );

  return films ? (
    <>
      <span className="sr-only" id="multi-select-label">
        Select filter by movie
      </span>

      <MultiSelect
        className={styles.root}
        disableSearch
        disabled={disabled}
        hasSelectAll={false}
        overrideStrings={{
          selectSomeItems: 'Filter by movies...',
          allItemsAreSelected: 'All movies are selected',
        }}
        onChange={handleChange}
        value={selected}
        labelledBy="multi-select-label"
        options={films.map((film: Film) => ({
          value: film.url,
          label: film.title,
        }))}
      />
    </>
  ) : null;
}
