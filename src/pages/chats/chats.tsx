import "./chats.scss";
import { createPortal } from "react-dom";
import { Sidebar } from "../../components/sidebar/sidebar";
import { SidebarItem } from "../../components/sidebar/sidebar-item";
import { Chat } from "./chat/chat";
import { NewChatModal } from "./new-chat/new-chat";
import { useEffect, useState } from "react";
import { useApp } from "../../store/store";

const ChatsPage = () => {
    const chatsMap = useApp((s) => s.chats);
    const selectedChat = useApp((s) => s.selectedChat);
    const selectChat = useApp((s) => s.selectChat);
    const receiveNotification = useApp((s) => s.receiveNotification);
    const chats = Object.keys(chatsMap);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectChat = (phone: string) => {
        selectChat(phone);
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const controller = new AbortController();

        const id = setInterval(async () => {
            try {
                await receiveNotification(controller.signal);
            } catch (error) {
                if (controller.signal.aborted) return;

                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }, 5000);

        return () => clearInterval(id);
    }, []);

    return (
        <div className="chats">
            <Sidebar onCreate={handleOpen}>
                {chats.map((c) => (
                    <SidebarItem
                        key={c}
                        name={c}
                        active={selectedChat === c}
                        onClick={handleSelectChat}
                    />
                ))}
            </Sidebar>
            {selectedChat && <Chat />}
            {isOpen &&
                createPortal(
                    <NewChatModal onClose={handleClose} />,
                    document.body
                )}
        </div>
    );
};

export default ChatsPage;
