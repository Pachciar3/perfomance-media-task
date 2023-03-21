import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import { Routes } from '@/types/route';
import containerStyles from '@/components/atoms/Container/Container.module.scss';
import { LinkButton, styles as stylesButton } from '@/components/atoms/Button';

import styles from './Home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Performance Media - recruitment task</title>
        <meta name="description" content="Integration with Starwars api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={clsx(containerStyles.root, styles.main)}>
        <div>
          <h2 className={styles.title}>
            Show all starships <Link href={`${Routes.STARSHIPS}/1`}>here</Link>
          </h2>
          <p className={styles.paragraph}>
            Welcome to our Star Wars starships explorer page! If you are a fan
            of the iconic space franchise, then you will love exploring the
            various ships that have made their mark in the Star Wars universe.
          </p>
          <p className={styles.paragraph}>
            From the Millennium Falcon to the X-Wing, the Star Wars galaxy is
            filled with an array of unique and impressive starships that have
            captured the imaginations of fans worldwide. Our page is dedicated
            to providing you with a comprehensive guide to all the different
            types of starships that you can find in the Star Wars universe.
          </p>
          <p className={styles.paragraph}>
            Whether you are interested in learning about the history of each
            ship or want to compare their technical specifications, our Star
            Wars starships explorer page has got you covered. We have gathered
            all the information you need to know about the most popular
            starships, as well as some of the lesser-known vessels that have
            made an appearance in the franchise.
          </p>
          <LinkButton
            href={`${Routes.STARSHIPS}/1`}
            className={clsx(stylesButton.big, styles.btn)}
          >
            Start explore
          </LinkButton>
        </div>
      </main>
    </>
  );
}
