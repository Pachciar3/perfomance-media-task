import styles from './Message.module.scss';

export default function Message() {
  return (
    <div className={styles.message}>
      <p className={styles.message__top}>
        We could not find a starship with the specified parameters
      </p>
      <p className={styles.message__bottom}>Select other parameters</p>
    </div>
  );
}
