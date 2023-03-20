import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";

import { Starship } from "@/api/types/Starship";
import { ListItem } from "@/components/atoms/ListItem";
import { Button, styles as buttonStyles } from "@/components/atoms/Button";

import styles from "./StarshipDetails.module.scss";

export interface StarshipDetailsProps {
  data: Starship;
}

export default function StarshipDetails(props: StarshipDetailsProps) {
  const { data } = props;
  const router = useRouter();

  const goBack = useCallback(() => {
    router.back();
  }, [router]);

  const editedDate = new Date(data.edited);
  const createDate = new Date(data.created);

  return (
    <>
      <Head>
        <title>Performance Media - recruitment task - starship </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{data.name}</h1>
        <ul className={styles.list}>
          <ListItem name="Model" value={data.model} />
          <ListItem name="Manufacturer" value={data.manufacturer} />
          <ListItem name="Cost in credits" value={data.cost_in_credits} />
          <ListItem name="Length" value={data.length} />
          <ListItem
            name="Max atmosphering speed"
            value={data.max_atmosphering_speed}
          />
          <ListItem name="Crew" value={data.crew} />
          <ListItem name="Passengers" value={data.passengers} />
          <ListItem name="Cargo capacity" value={data.cargo_capacity} />
          <ListItem name="Consumables" value={data.consumables} />
          <ListItem name="Hyperdrive rating" value={data.hyperdrive_rating} />
          <ListItem name="MGLT" value={data.MGLT} />
          <ListItem name="Starship Class" value={data.starship_class} />
          <ListItem name="Created" value={createDate.toUTCString()} />
          <ListItem name="Edited" value={editedDate.toUTCString()} />
        </ul>

        <Button className={buttonStyles.big} onClick={goBack}>
          Back
        </Button>
      </main>
    </>
  );
}
