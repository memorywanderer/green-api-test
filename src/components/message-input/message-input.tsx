import { useState } from "react";
import { ArrowUpIcon } from "../../icons";
import { useApp } from "../../store/store";
import { Button } from "../button/button";
import { Flex } from "../flex/flex";
import { Input } from "../input/input";
import "./message-input.scss";

export const MessageInput = () => {
    const [message, setMessage] = useState("");
    const selectedChat = useApp((s) => s.selectedChat);
    const sendMessage = useApp((s) => s.sendMessage);

    const handleSend = async () => {
        if (!selectedChat) return;
        await sendMessage(selectedChat, message);
        setMessage("");
    };

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setMessage(value);
    };

    return (
        <Flex className="flex message-input">
            <Input
                id="message-input"
                className="w-full"
                placeholder="Сообщение"
                value={message}
                onChange={handleMessage}
            />
            <Button
                className="message-input__send-btn"
                variant="icon"
                onClick={handleSend}
                disabled={!message.length}
            >
                <ArrowUpIcon />
            </Button>
        </Flex>
    );
};
