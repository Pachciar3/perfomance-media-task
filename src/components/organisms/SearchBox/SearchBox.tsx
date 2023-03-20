import { useCallback, useRef, useState } from 'react';
import clsx from 'clsx';

import { getAllStarships } from '@/api/methods/getAllStarships';
import { Starship } from '@/api/types/Starship';

import List from './components/List';
import SearchField from './components/SearchField';
import LoadMore from './components/LoadMore';
import styles from './SearchBox.module.scss';

function SearchBox() {
  const [value, setValue] = useState<string>('');
  const [results, setResults] = useState<Starship[] | undefined | null>(null);
  const [loadMoreLink, setLoadMoreLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const divRef = useRef<HTMLDivElement | null>(null);

  const search = useCallback((value: string) => {
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
  }, []);

  return (
    <div ref={divRef} className={styles.searchSection}>
      <SearchField
        divRef={divRef}
        setValue={setValue}
        value={value}
        setResults={setResults}
        search={search}
      />
      {loading && Boolean(value.length) && (
        <span title="loading..." className={styles.loading}>
          Loading...
        </span>
      )}
      <div className={clsx(styles.dropdown, value.length && styles.open)}>
        {results && results.length ? (
          <>
            <List results={results} />
            <LoadMore
              results={results}
              value={value}
              loadMoreLink={loadMoreLink}
              setResults={setResults}
              setLoadMoreLink={setLoadMoreLink}
              setLoading={setLoading}
              loading={loading}
            />
          </>
        ) : (
          <span className={styles.message}>We did not find any starships</span>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
