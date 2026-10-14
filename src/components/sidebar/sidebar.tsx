import "./sidebar.scss";
import type { ReactNode } from "react";
import { Flex } from "../flex/flex";
import { Button } from "../button/button";
import { PlusIcon } from "../../icons";

interface SidebarProps {
    children: ReactNode;
    onCreate: () => void;
}

export const Sidebar = ({ children, onCreate }: SidebarProps) => {
    return (
        <Flex className="sidebar">
            <Flex className="w-full sidebar__header" justify="between">
                <span>Чаты</span>
                <Button variant="icon" onClick={onCreate}>
                    <PlusIcon />
                </Button>
            </Flex>
            {children}
        </Flex>
    );
};
