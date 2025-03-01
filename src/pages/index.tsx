import fs from "fs";
import path from "path";

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), "data", "products.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const products = JSON.parse(jsonData);

    return { props: { products }, revalidate: 10 };
}

export default function ProductsPage({ products }) {
    return (
        <div>
            <h1>Продукти</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <p>Цена: {product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
