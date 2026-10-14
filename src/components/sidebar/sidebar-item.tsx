import clsx from "clsx";
import { Flex } from "../flex/flex";
import "./sidebar-item.scss";

interface SidebarItemProps {
    name: string;
    active: boolean;
    onClick: (name: string) => void;
}

export const SidebarItem = ({ name, active, onClick }: SidebarItemProps) => {
    return (
        <Flex
            className={clsx(
                "w-full sidebar-item",
                active && "sidebar-item--active"
            )}
            align="center"
            onClick={() => onClick(name)}
        >
            <span>{name}</span>
        </Flex>
    );
};
