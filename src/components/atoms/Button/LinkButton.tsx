import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  memo,
  ReactNode,
} from 'react';
import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';

import styles from './Button.module.scss';

export interface LinkButtonProps extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

function Button(props: LinkButtonProps) {
  const { children, className: _className, ...restOfProps } = props;

  return (
    <Link
      className={clsx(
        styles.button,
        restOfProps.disabled && styles.disabled,
        _className,
      )}
      {...restOfProps}
    >
      {children}
    </Link>
  );
}

export default memo(Button);
