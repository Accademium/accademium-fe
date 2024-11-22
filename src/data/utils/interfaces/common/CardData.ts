export interface CardData {
    title: string; // alt 'question' in QuestionsScreen
    description: string;
}

export interface LinkCardData extends CardData {
    link: string;
    linkUrl: string;
}