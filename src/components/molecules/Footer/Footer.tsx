import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Created by <a href="https://github.com/Pachciar3/">Dawid Pachciarek</a>{' '}
      for <a href="https://performancemedia.pl/">Performence Media</a>
    </footer>
  );
}
