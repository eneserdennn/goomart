import BottomNavBar from "@/components/bottom-navbar/BottomNavBar";
import CategoryBar from '@/components/CategoryBar';
import ProductContainer from '@/containers/ProductContainer';

const CategoriesPage = ({ params }) => {
    const categoryId = parseInt(params.categories[0])
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
            <ProductContainer/>
            </div>
            <BottomNavBar />
        </>
    );
};

export default CategoriesPage;
