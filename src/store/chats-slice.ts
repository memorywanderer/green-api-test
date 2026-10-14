import type { StateCreator } from "zustand";
import type { StoreType } from "./store";
import GreenApi from "../api/green-api";

export type ChatMessage = {
    id: string;
    text: string;
    direction: "outgoing" | "incoming";
    status: "pending" | "sent";
    createdAt: number;
};

type ChatsSliceState = {
    selectedChat: string | null;
    chats: Record<string, string>;
    chatMessages: Record<string, string[]>;
    messages: Record<string, ChatMessage>;
};

type ChatsSliceActions = {
    createChat: (phone: string) => void;
    selectChat: (phone: string) => void;
    sendMessage: (chatId: string, message: string) => Promise<void>;
    receiveNotification: (controller: AbortSignal) => Promise<void>;
};

export type ChatsSliceProps = ChatsSliceState & ChatsSliceActions;

const initialState = (): ChatsSliceState => ({
    selectedChat: null,
    chats: {},
    chatMessages: {},
    messages: {},
});

const greenApi = GreenApi.instance;

export const createChatsSlice: StateCreator<
    StoreType,
    [["zustand/immer", never]],
    [],
    ChatsSliceProps
> = (set, get) => ({
    ...initialState(),
    createChat(phone: string) {
        const formatted = `${phone}@c.us`;

        set((state) => ({ chats: { ...state.chats, [formatted]: "test" } }));
    },
    selectChat(phone) {
        set({ selectedChat: phone });
    },
    async sendMessage(chatId: string, message: string) {
        const newMessage: ChatMessage = {
            id: crypto.randomUUID(),
            text: message,
            direction: "outgoing",
            status: "pending",
            createdAt: Date.now(),
        };

        const chatMessagesSnapshot = get().chatMessages;
        const messagesSnapshot = get().messages;
        const credentials = get().credentials;

        if (!credentials) return;

        set((state) => {
            if (!state.chatMessages[chatId]) {
                state.chatMessages[chatId] = [];
            }
            state.chatMessages[chatId].push(newMessage.id);
            state.messages[newMessage.id] = newMessage;
        });

        try {
            await greenApi.sendMessage(credentials, {
                chatId,
                message: newMessage.text,
            });
            set((state) => {
                state.messages[newMessage.id].status = "sent";
            });
        } catch (error) {
            console.error("Send message error", error);
            set((state) => {
                state.chatMessages = chatMessagesSnapshot;
                state.messages = messagesSnapshot;
            });
        }
    },
    async receiveNotification(controller) {
        const credentials = get().credentials;
        const chats = get().chats;

        if (!credentials) return;

        try {
            const notification =
                await greenApi.receiveNotification(credentials, controller);

            const receiptId = notification.data?.receiptId;
            const notificationBody = notification.data?.body;
            const phoneNumberId = `${notificationBody?.senderData?.senderPhoneNumber}@c.us`;
            const chatId = notificationBody?.senderData?.chatId;

            if (
                notificationBody?.typeWebhook === "incomingMessageReceived" &&
                notificationBody.messageData?.typeMessage === "textMessage" &&
                typeof notificationBody.messageData.textMessageData
                    ?.textMessage === "string" &&
                receiptId &&
                phoneNumberId &&
                chats[phoneNumberId] != null &&
                chatId
            ) {
                set((state) => {
                    const messageId = notificationBody.idMessage;
                    state.messages[messageId] = {
                        id: messageId,
                        direction: "incoming",
                        status: "sent",
                        createdAt: notificationBody.timestamp * 1000,
                        text: notificationBody.messageData.textMessageData
                            .textMessage,
                    };


                    if (
                        !state.chatMessages[phoneNumberId]
                    ) {
                        state.chatMessages[phoneNumberId] =
                            [];
                    }
                    state.chatMessages[phoneNumberId].push(
                        messageId
                    );
                });

                await greenApi.deleteNotification({
                    ...credentials,
                    receiptId,
                });
            }

            if (receiptId && notificationBody?.typeWebhook !== "incomingMessageReceived")
                await greenApi.deleteNotification({
                    ...credentials,
                    receiptId,
                });
        } catch (error) {
            console.error("Receive notification error", error);
        }
    },
});
