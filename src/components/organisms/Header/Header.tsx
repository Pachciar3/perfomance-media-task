import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo.png";
import { Routes } from "@/types/route";

import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href={Routes.HOME}>
        <Image
          sizes="(max-width: 768px) 260px,
          180px"
          src={logo}
          priority
          quality={1}
          alt="star wars logo"
        />
      </Link>
    </header>
  );
}
