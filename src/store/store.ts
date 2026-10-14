import { create } from "zustand";
import { createAuthSlice, type AuthSliceProps } from "./auth-slice";
import { createChatsSlice, type ChatsSliceProps } from "./chats-slice";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

export type StoreType = AuthSliceProps & ChatsSliceProps;

export const useApp = create<StoreType>()(
    persist(
        immer((...a) => ({
            ...createAuthSlice(...a),
            ...createChatsSlice(...a),
        })),
        {
            name: "chat-store",
            storage: createJSONStorage(() => localStorage),
            version: 1,
            partialize: (s) => ({ chats: s.chats, chatMessages: s.chatMessages, messages: s.messages, }),
        }
    )
);
