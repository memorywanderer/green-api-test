import { Flex } from "../flex/flex";
import "./chat-header.scss";

export const ChatHeader = () => {
    return (
        <Flex className="w-full chat-header" gap={4}>
            <span className="chat-header__avatar flex align-center justify-center">
                <span>X</span>
            </span>
            <span className="chat-hedaer__name">GREEN API test</span>
        </Flex>
    );
};
