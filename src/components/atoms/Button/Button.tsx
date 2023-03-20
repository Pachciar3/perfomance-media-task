import styles from "./Button.module.scss";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  memo,
  ReactNode,
} from "react";
import clsx from "clsx";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

function Button(props: ButtonProps) {
  const { children, className: _className, ...restOfProps } = props;
  const test = "";
  return (
    <button
      className={clsx(
        styles.button,
        restOfProps.disabled && styles.disabled,
        _className
      )}
      {...restOfProps}
    >
      {children}
    </button>
  );
}

export default memo(Button);
