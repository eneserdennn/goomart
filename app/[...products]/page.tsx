import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/product-cards/ProductCard';
import ProductContainer from '@/containers/ProductContainer';

const Products = ({ params }) => {
    const categoryId = parseInt(params.products[1]);

    if (isNaN(categoryId)) {
        const defaultCategoryID = 0;
        return (
            <CategoryBar categoryId={defaultCategoryID} />
        );
    }

    return (
        <>
            <CategoryBar categoryId={categoryId} />
            <ProductContainer >
                <ProductCard />
            </ProductContainer>
        </>
    );
};

export default Products;
