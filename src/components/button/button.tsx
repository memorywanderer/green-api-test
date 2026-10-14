import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "icon";
    color?: "primary" | "secondary";
}

export const Button = ({
    className,
    variant = "default",
    color = "primary",
    children,
    ...rest
}: ButtonProps) => {
    return (
        <button
            {...rest}
            className={clsx(
                `flex align-center justify-center button button--${variant}`,
                `button--${color}`,
                className
            )}
        >
            {children}
        </button>
    );
};
