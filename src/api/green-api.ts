import type { AxiosInstance, AxiosResponse } from "axios";
import { apiClient } from "./api";
import type {
    DeleteNotificationRequestParams,
    DeleteNotificationResponse,
    ReceiveNotificationRequestParams,
    ReceiveNotificationResponse,
    SendMessageBody,
    SendMessageResponse,
} from "./types";

interface GreenApiProps {
    sendMessage: (
        params: ReceiveNotificationRequestParams,
        body: SendMessageBody
    ) => Promise<AxiosResponse<SendMessageResponse>>;
    receiveNotification: (
        params: ReceiveNotificationRequestParams,
        controller: AbortSignal
    ) => Promise<AxiosResponse<ReceiveNotificationResponse>>;
    deleteNotification: (
        params: DeleteNotificationRequestParams
    ) => Promise<AxiosResponse<DeleteNotificationResponse>>;
}

class GreenApi implements GreenApiProps {
    #api: AxiosInstance;
    static #apiInstance: GreenApi;

    constructor(axiosInstance: AxiosInstance) {
        this.#api = axiosInstance;
    }

    public static get instance() {
        if (!this.#apiInstance) {
            this.#apiInstance = new GreenApi(apiClient);
        }

        return this.#apiInstance;
    }

    async sendMessage(
        params: ReceiveNotificationRequestParams,
        body: SendMessageBody
    ) {
        return this.#api.post<SendMessageResponse>(
            `/waInstance${params.idInstance}/sendMessage/${params.apiTokenInstance}`,
            body
        );
    }

    async receiveNotification(params: ReceiveNotificationRequestParams, controller: AbortSignal) {
        return this.#api.get<ReceiveNotificationResponse>(
            `/waInstance${params.idInstance}/receiveNotification/${params.apiTokenInstance}`,
            {signal: controller}
        );
    }

    async deleteNotification(params: DeleteNotificationRequestParams) {
        return this.#api.delete<DeleteNotificationResponse>(
            `/waInstance${params.idInstance}/deleteNotification/${params.apiTokenInstance}/${params.receiptId}`
        );
    }
}

export default GreenApi;
