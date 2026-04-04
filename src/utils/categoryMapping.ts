// Maps database category/subcategory values (Bulgarian) to i18n translation keys.
// DB stores values in Bulgarian. We use these keys to display translated names.

export const CATEGORY_KEYS: Record<string, string> = {
    "инструменти": "category.tools",
    "машини": "category.machines",
    "софтуер": "category.software",
};

export const SUBCATEGORY_KEYS: Record<string, string> = {
    "индивидуални инструменти": "subcategory.individual_tools",
    "диамантени инструменти": "subcategory.diamond_tools",
    "дискове": "subcategory.discs",
    "фрезери": "subcategory.routers",
    "кантиращи машини": "subcategory.edge_banding",
    "CNC рутери": "subcategory.cnc_routers",
    "циркуляри": "subcategory.circular_saws",
    "пробивни машини": "subcategory.drilling_machines",
};
