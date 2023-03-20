import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.webp";
import { Routes } from "@/types/route";

import styles from "./Header.module.scss";

export interface HeaderProps {}

export default function Header(props: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link href={Routes.HOME}>
        <Image
          sizes="(max-width: 768px) 300px,
          250px"
          src={logo}
          priority
          quality={1}
          alt="star wars logo"
        />
      </Link>
    </header>
  );
}
