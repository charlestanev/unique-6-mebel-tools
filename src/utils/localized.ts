import type { Product } from "@/types/product";

/** Returns the localized product name based on the current locale. */
export function getProductName(product: Product, locale: string | undefined): string {
    if (locale === "en" && product.nameEn) return product.nameEn;
    return product.name;
}

/** Returns the localized product description based on the current locale. */
export function getProductDescription(product: Product, locale: string | undefined): string {
    if (locale === "en" && product.descriptionEn) return product.descriptionEn;
    return product.description;
}
