import { memo, ReactNode, useCallback } from 'react';
import Link, { LinkProps } from 'next/link';

import { useAppContext } from '../../context/main';

export interface InternalLinkProps extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

function InternalLink(props: InternalLinkProps) {
  const { children, className, ...restOfProps } = props;
  const context = useAppContext();
  const handleClick = useCallback(() => {
    if (context) {
      context.setLink(true);
    }
  }, [context]);

  return (
    <Link className={className} onClick={handleClick} {...restOfProps}>
      {children}
    </Link>
  );
}

export default memo(InternalLink);
