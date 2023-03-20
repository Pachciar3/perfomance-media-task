import { Film } from "@/api/types/Film";
import { Starship } from "@/api/types/Starship";
import { getStarshipIdFromUrl } from "@/utils/getStarshipId";
import { useCallback, useState } from "react";
import styles from "./Starships.module.scss";
import { Starship as StarshipEl } from "@/components/molecules/Starship";
import { MultiSelect, Option } from "react-multi-select-component";

export interface StarshipsProps {
  data?: Starship[] | null;
  films?: Film[] | null;
}

export default function Starships(props: StarshipsProps) {
  const { data, films } = props;
  const [selected, setSelected] = useState<Option[]>([]);

  const handleChange = useCallback((options: Option[]) => {
    setSelected(options);
  }, []);

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
        {films && (
          <MultiSelect
            className={styles.rmsc}
            disableSearch
            overrideStrings={{
              selectSomeItems: "Filter by movies...",
              allItemsAreSelected: "All movies are selected",
              selectAll: "Select all movies",
            }}
            onChange={handleChange}
            value={selected}
            labelledBy="Select"
            options={films.map((film: Film) => ({
              value: film.url,
              label: film.title,
            }))}
          />
        )}
      </div>

      <div className={styles.table}>
        {starships?.length ? starships : "No data"}
      </div>
    </div>
  );
}
