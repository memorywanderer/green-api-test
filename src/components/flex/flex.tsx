import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    align?: "start" | "center";
    justify?: "start" | "center" | "between" | "end";
    direction?: "row" | "column";
    grow?: boolean;
    gap?: 2 | 3 | 4 | 8;
}

export const Flex = ({
    children,
    className,
    direction,
    align,
    justify,
    grow,
    gap,
    ...rest
}: FlexProps) => {
    return (
        <div
            {...rest}
            className={clsx(
                "flex",
                direction && `flex-${direction}`,
                align && `algin-${align}`,
                justify && `justify-${justify}`,
                gap && `gap-${gap}`,
                grow && "flex-1",
                className
            )}
        >
            {children}
        </div>
    );
};
