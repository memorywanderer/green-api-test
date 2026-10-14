import { Flex } from "../../../components/flex/flex";
import { Message } from "../../../components/message/message";
import "./messages.scss";

interface MessagesProps {
    messages: string[];
}

export const Messages = ({messages}: MessagesProps) => {
    return (
        <Flex
            className="w-full messages"
            direction="column"
            justify="end"
            grow
            gap={4}
        >
            {messages.map(m => (
                <Message key={m} id={m}/>
            ))}
        </Flex>
    );
};
