import { ChatHeader } from "../../../components/chat-header/chat-header";
import { Flex } from "../../../components/flex/flex";
import { MessageInput } from "../../../components/message-input/message-input";
import { useApp } from "../../../store/store";
import { Messages } from "../messages/messages";

export const Chat = () => {
    const selectedChat = useApp((s) => s.selectedChat);

    const messageIds = useApp((s) =>
        selectedChat ? s.chatMessages[selectedChat] : null
    );

    return (
        <Flex direction="column" grow>
            <ChatHeader />

            {messageIds != null && messageIds?.length > 0 ? (
                <Messages messages={messageIds} />
            ) : (
                <span className="flex-1 flex justify-center">Сообщений нет</span>
            )}
            <MessageInput />
        </Flex>
    );
};
