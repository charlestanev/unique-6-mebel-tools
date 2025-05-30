export interface Product {
    id: string;
    name: string;
    price?: number;
    description: string;
    image: string;
    category: string;
    subcategory?: string;
    media?: string[];
}
