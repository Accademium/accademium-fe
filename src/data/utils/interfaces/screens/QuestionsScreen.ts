import { CardData } from "@/data/utils/interfaces/common/CardData.ts";

export interface QuestionsScreenProps extends CardData {
    isOpen: boolean;
    onClick: () => void;
}