export interface SendMessageBody {
    chatId: string;
    message: string;
}

export interface SendMessageResponse {
    idMessage: string;
}

export interface ReceiveNotificationRequestParams {
    idInstance: string | number;
    apiTokenInstance: string;
}

type NotificationBody = IncomingMessageReceivedWebhook;

export type ReceiveNotificationResponse = {
    receiptId: number;
    body: NotificationBody;
} | null;

export type WebhookType =
    | "incomingMessageReceived"
    | "outgoingMessageReceived"
    | "outgoingMessageStatus"
    | "stateInstanceChanged"
    | "deviceStatus";

interface BaseWebhook {
    typeWebhook: WebhookType;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
}

interface TextMessageData {
    typeMessage: "textMessage";
    textMessageData: {
        textMessage: string;
    };
}

export interface IncomingMessageReceivedWebhook extends BaseWebhook {
    typeWebhook: "incomingMessageReceived" | "outgoingMessageStatus";
    idMessage: string;
    senderData: {
        chatId: string;
        sender: string;
        senderName?: string;
        senderContactName?: string;
        senderPhoneNumber: number;
    };
    messageData: TextMessageData;
}

export interface DeleteNotificationRequestParams {
    idInstance: string | number;
    apiTokenInstance: string;
    receiptId: number;
}

export interface DeleteNotificationResponse {
    result: boolean;
}
