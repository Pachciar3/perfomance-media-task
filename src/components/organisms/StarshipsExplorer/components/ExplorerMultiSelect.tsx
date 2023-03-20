import { Dispatch, SetStateAction, useCallback } from "react";
import { MultiSelect, Option } from "react-multi-select-component";

import { Film } from "@/api/types/Film";

import styles from "./ExplorerMultiSelect.module.scss";

export interface ExplorerMultiSelectProps {
  films?: Film[] | null;
  selected: Option[];
  setSelected: Dispatch<SetStateAction<Option[]>>;
}

export default function ExplorerMultiSelect(props: ExplorerMultiSelectProps) {
  const { films, selected, setSelected } = props;

  const handleChange = useCallback(
    (options: Option[]) => {
      setSelected(options);
    },
    [setSelected]
  );

  return films ? (
    <MultiSelect
      className={styles.root}
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
  ) : null;
}
