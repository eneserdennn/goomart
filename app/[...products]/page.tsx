import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/product-cards/ProductCard';
import ProductContainer from '@/containers/ProductContainer';
import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";

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
            <div className="flex mb-20">
            <ProductContainer />
            </div>
            <BottomNavBar />
        </>
    );
};

export default Products;
