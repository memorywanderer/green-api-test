import type { InputHTMLAttributes } from "react";
import { Flex } from "../flex/flex";
import "./input.scss";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: "primary" | "secondary";
}

export const Input = ({
    className,
    label,
    name,
    placeholder,
    variant = "primary",
    id,
    ...rest
}: InputProps) => {
    return (
        <Flex
            className={clsx("input", className)}
            direction="column"
            align="start"
            gap={4}
        >
            {label != null && (
                <label htmlFor={id}>
                    <span className="input__label">{label}</span>
                </label>
            )}
            <input
                {...rest}
                id={id}
                className={`flex align-center input__field input__field--${variant}`}
                name={name}
                placeholder={placeholder}
            />
        </Flex>
    );
};
