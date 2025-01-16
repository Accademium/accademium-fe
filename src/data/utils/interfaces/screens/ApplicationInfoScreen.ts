import { CardData } from "@/data/utils/interfaces/common/CardData.ts";

export interface ApplicationInfoScreenProps extends CardData {
    isOpen: boolean;
    onClick: () => void;
}