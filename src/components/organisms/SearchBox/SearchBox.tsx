import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';

import { getAllStarships } from '@/api/methods/getAllStarships';
import { Starship } from '@/api/types/Starship';
import { Button } from '@/components/atoms/Button';
import useOutsideClick from '@/hooks/useOnClickOutside';
import { Routes } from '@/types/route';
import { debounce } from '@/utils/debounce';
import { getStarshipIdFromUrl } from '@/utils/getStarshipId';

import styles from './SearchBox.module.scss';
import SearchIcon from './assets/searchIcon.svg';
import Arrow from './assets/arrow.svg';

export interface SearchBoxProps {}

function SearchBox(props: SearchBoxProps) {
  const test = '';
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Starship[] | undefined | null>(null);
  const [loadMoreLink, setLoadMoreLink] = useState<string | null | undefined>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOutsideClick = useCallback(() => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      setResults(null);
    }
  }, []);

  useOutsideClick([divRef], handleOutsideClick);

  const search = (value: string) => {
    if (value) {
      setLoading(true);
      getAllStarships(1, value)
        .then((res) => {
          setResults(res?.results);
          setLoadMoreLink(res?.next);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
        });
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    search(e.target.value);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadMoreLink && value) {
      const queryParams = new URLSearchParams(loadMoreLink);
      const page = queryParams.get('page');
      if (page) {
        setLoading(true);
        getAllStarships(Number(page), value)
          .then((res) => {
            if (res?.results && results) {
              const newResults: Starship[] = [...results, ...res?.results];
              setResults(newResults);
            }
            setLoadMoreLink(res?.next);
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            console.error(e);
          });
      }
    }
  }, [loadMoreLink, results, value]);

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 300),
    [handleChange],
  );

  return (
    <div ref={divRef} className={styles.searchSection}>
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
      {loading && Boolean(value.length) && (
        <span title="loading..." className={styles.loading}>
          Loading...
        </span>
      )}
      <div className={clsx(styles.dropdown, value.length && styles.open)}>
        {results && results.length ? (
          <>
            <ul className={styles.list}>
              {results.map((result) => (
                <li key={result.url}>
                  <a
                    className={styles.resultItemLink}
                    href={`${Routes.STARSHIP}/${getStarshipIdFromUrl(
                      result.url,
                    )}`}
                  >
                    {result.name}
                    <Arrow className={styles.arrow} />
                  </a>
                </li>
              ))}
            </ul>
            {loadMoreLink && (
              <Button
                disabled={loading}
                onClick={handleLoadMore}
                className={styles.btn}
              >
                Give me more
                <Arrow className={styles.arrow} />
              </Button>
            )}
          </>
        ) : (
          <span className={styles.message}>We did not find any starships</span>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
