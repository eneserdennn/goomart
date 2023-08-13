import CategoryBar from "@/components/CategoryBar";

interface ProductsProps {
    params: {
        products: string[];
    };
}

const Products: React.FC<ProductsProps> = ({ params }) => {
    const categoryId = parseInt(params.products[1]);
    if (categoryId === undefined) {
        const defaultCategoryID = 0;
        return (
            <CategoryBar categoryId={defaultCategoryID} />
        );
    }

    return (
        <CategoryBar categoryId={categoryId} />
    );
};

export default Products;
