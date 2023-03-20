import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import clsx from 'clsx';

import { Starship } from '@/api/types/Starship';
import useOutsideClick from '@/hooks/useOnClickOutside';
import { debounce } from '@/utils/debounce';

import styles from './SearchField.module.scss';

import SearchIcon from '../assets/searchIcon.svg';

export interface SearchFieldProps {
  setResults: Dispatch<SetStateAction<Starship[] | null | undefined>>;
  setValue: Dispatch<SetStateAction<string>>;
  search: (value: string) => void;
  value: string;
}

function SearchField(props: SearchFieldProps) {
  const { setResults, search, setValue, value } = props;

  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOutsideClick = useCallback(() => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      setResults(null);
    }
  }, [setResults, setValue]);
  useOutsideClick([divRef], handleOutsideClick);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      search(e.target.value);
    },
    [search, setValue],
  );

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange],
  );

  return (
    <div className={clsx(styles.root, value.length && styles.open)}>
      <SearchIcon className={styles.icon} />
      <input
        type="text"
        ref={inputRef}
        placeholder="Search starships..."
        aria-label="Search starships"
        className={styles.input}
        onChange={debouncedHandleChange}
      />
    </div>
  );
}

export default SearchField;
