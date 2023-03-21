import { memo, ReactNode } from 'react';
import clsx from 'clsx';
import { LinkProps } from 'next/link';

import { InternalLink } from '@/components/atoms/InternalLink';

import styles from './Button.module.scss';

export interface LinkButtonProps extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

function Button(props: LinkButtonProps) {
  const { children, className: _className, ...restOfProps } = props;

  return (
    <InternalLink
      className={clsx(
        styles.button,
        restOfProps.disabled && styles.disabled,
        _className,
      )}
      {...restOfProps}
    >
      {children}
    </InternalLink>
  );
}

export default memo(Button);
