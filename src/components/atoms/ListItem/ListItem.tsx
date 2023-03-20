import styles from "./ListItem.module.scss";

export interface ListItemProps {
  name: string;
  value: string;
}

function ListItem(props: ListItemProps) {
  const { name, value } = props;

  return (
    <li className={styles.item}>
      <span className={styles.item__name}>{name}</span>
      <span className={styles.item__value}>{value}</span>
    </li>
  );
}

export default ListItem;
