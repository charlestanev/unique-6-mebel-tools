import { atom } from "jotai";
import { Product } from "../types/product";

// Дали админът е логнат
export const isAuthenticatedAtom = atom<boolean>(false);

// Списък с продукти
export const productsAtom = atom<Product[]>([]);

// Тъмен режим
export const darkModeAtom = atom<boolean>(false);
