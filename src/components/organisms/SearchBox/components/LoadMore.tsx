import { Dispatch, memo, SetStateAction, useCallback } from 'react';

import { getAllStarships } from '@/api/methods/getAllStarships';
import { Starship } from '@/api/types/Starship';
import { Button } from '@/components/atoms/Button';
import { Status } from '@/types/status';

import styles from './LoadMore.module.scss';

import Arrow from '../assets/arrow.svg';

export interface LoadMoreProps {
  setResults: Dispatch<SetStateAction<Starship[] | null | undefined>>;
  setLoadMoreLink: Dispatch<SetStateAction<string | null>>;
  setStatus: Dispatch<SetStateAction<Status>>;
  loadMoreLink: string | null;
  value: string;
  loading: boolean;
  results: Starship[];
}

function LoadMore(props: LoadMoreProps) {
  const {
    loadMoreLink,
    value,
    setStatus,
    setResults,
    setLoadMoreLink,
    loading,
    results,
  } = props;

  const handleLoadMore = useCallback(() => {
    if (loadMoreLink && value) {
      const queryParams = new URLSearchParams(loadMoreLink);
      const page = queryParams.get('page');
      if (page) {
        setStatus(Status.LOADING);
        getAllStarships(Number(page), value)
          .then((res) => {
            if (res?.results && results) {
              const newResults: Starship[] = [...results, ...res?.results];
              setResults(newResults);
            }
            setLoadMoreLink(res?.next);
            setStatus(Status.SUCCESS);
          })
          .catch((e) => {
            setStatus(Status.ERROR);
            console.error(e);
          });
      }
    }
  }, [loadMoreLink, value, setStatus, results, setLoadMoreLink, setResults]);

  return loadMoreLink ? (
    <Button disabled={loading} onClick={handleLoadMore} className={styles.btn}>
      Give me more
      <Arrow className={styles.arrow} />
    </Button>
  ) : null;
}

export default memo(LoadMore);
