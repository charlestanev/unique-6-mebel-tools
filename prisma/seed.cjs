const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, '../data/products.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {},
            create: {
                ...product,
                price: Number(product.price),
            },
        });
    }

    console.log('✅ Seed complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
