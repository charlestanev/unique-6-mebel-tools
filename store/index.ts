import { atom } from "jotai";
import { Product } from "../types/product";

// Дали админът е логнат
export const isAuthenticatedAtom = atom<boolean>(false);

// Списък с продукти
export const productsAtom = atom<Product[]>([]);

// Тъмен режим
export const darkModeAtom = atom(
    (typeof window !== "undefined" && localStorage.getItem("theme") === "dark") || false
);