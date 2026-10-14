import { useState } from "react";
import { Button } from "../../../components/button/button";
import { Flex } from "../../../components/flex/flex";
import { Input } from "../../../components/input/input";
import { Modal } from "../../../components/modal/modal";
import { useApp } from "../../../store/store";
import "./new-chat.scss";

interface NewChatModalProps {
    onClose: () => void;
}

export const NewChatModal = ({ onClose }: NewChatModalProps) => {
    const createChat = useApp((s) => s.createChat);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleNew = () => {
        const regex = /^\+?[1-9][0-9]{7,14}$/;
        if (regex.test(phoneNumber)) {
            createChat(phoneNumber);
            onClose();
        } else {
            setError("Неверный номер телефона");
        }
    };

    const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const { value } = e.target;
        setPhoneNumber(value);
    };

    return (
        <Modal name="Создать чат" onClose={onClose}>
            <Flex
                className="w-full new-chat"
                direction="column"
                justify="center"
                gap={8}
                grow
            >
                <Input
                    className="w-full"
                    label="Номер телефона"
                    value={phoneNumber}
                    variant="secondary"
                    onChange={handlePhoneNumber}
                />
                {error != null && (
                    <Flex className="w-full new-chat__error">
                        <span>{error}</span>
                    </Flex>
                )}
                <Button
                    className="w-full new-chat__btn"
                    onClick={handleNew}
                    disabled={!phoneNumber.length}
                >
                    Создать
                </Button>
            </Flex>
        </Modal>
    );
};
