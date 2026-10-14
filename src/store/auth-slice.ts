import type { StateCreator } from "zustand";
import type { StoreType } from "./store";
import cookie from "js-cookie";

export type AuthCredentials = {
    idInstance: string;
    apiTokenInstance: string;
};

type AuthSliceState = {
    authState: "pending" | "unauthenticated" | "authenticated";
    credentials: AuthCredentials | null;
};

type AuthSliceActions = {
    signIn: (credentials: AuthCredentials) => void;
    checkCookies: () => void;
};

export type AuthSliceProps = AuthSliceState & AuthSliceActions;

const initialState = (): AuthSliceState => ({
    credentials: null,
    authState: "pending",
});

const idInstanceKey = "idInstance";
const apiTokenInstanceKey = "apiTokenInstance";

export const createAuthSlice: StateCreator<
    StoreType,
    [["zustand/immer", never]],
    [],
    AuthSliceProps
> = (set) => ({
    ...initialState(),
    checkCookies() {
        const idInstance = cookie.get(idInstanceKey);
        const apiTokenInstance = cookie.get(apiTokenInstanceKey);
        const hasTokens = Boolean(
            cookie.get(idInstanceKey) && cookie.get(apiTokenInstanceKey)
        );

        set((s) => {
            ((s.authState = hasTokens ? "authenticated" : "unauthenticated"),
                (s.credentials =
                    idInstance && apiTokenInstance
                        ? { idInstance, apiTokenInstance }
                        : null));
        });
    },
    signIn(credentials) {
        cookie.set(idInstanceKey, credentials.idInstance);
        cookie.set(apiTokenInstanceKey, credentials.apiTokenInstance);

        set({ credentials, authState: "authenticated" });
    },
    signOut() {
        set({
            credentials: null,
            authState: "pending",
        });
    },
});
