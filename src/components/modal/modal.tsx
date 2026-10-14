import "./modal.scss";
import type { ReactNode } from "react";
import { Flex } from "../flex/flex";
import { Button } from "../button/button";
import { CloseIcon } from "../../icons";

interface ModalProps {
    onClose: () => void;
    name: string;
    children: ReactNode;
}

export const Modal = ({ name, children, onClose }: ModalProps) => {
    return (
        <Flex className="modal" align="center" justify="center">
            <div className="modal__overlay" onClick={onClose} />
            <Flex className="modal__container" direction="column">
                <Flex className="w-full modal__header" justify="between">
                    <span>{name}</span>
                    <Button variant="icon" color="secondary" onClick={onClose}>
                        <CloseIcon />
                    </Button>
                </Flex>
                {children}
            </Flex>
        </Flex>
    );
};
