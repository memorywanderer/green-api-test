import { Flex } from "../flex/flex";
import "./message.scss";
import { useApp } from "../../store/store";

interface MessageProps {
    id: string;
}

export const Message = ({ id }: MessageProps) => {
    const message = useApp((s) => s.messages[id]);

    return (
        <Flex
            className={`flex align-center message message--${message.direction}`}
        >
            <Flex className="message__inner">{message.text}</Flex>
        </Flex>
    );
};
