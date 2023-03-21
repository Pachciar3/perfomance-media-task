import Image from 'next/image';

import { InternalLink } from '@/components/atoms/InternalLink';
import logo from '@/assets/logo.png';
import { Routes } from '@/types/route';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <InternalLink href={Routes.HOME}>
        <Image
          sizes="(max-width: 768px) 600px, 400px"
          src={logo}
          priority
          quality={1}
          alt="star wars logo"
        />
      </InternalLink>
    </header>
  );
}
