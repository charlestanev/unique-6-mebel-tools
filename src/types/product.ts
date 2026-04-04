export interface Product {
    id: string;
    name: string;
    nameEn?: string;
    price?: number;
    description: string;
    descriptionEn?: string;
    image: string;
    category: string;
    subcategory?: string;
    media?: string[];
}
