import BannerProduct from "../components/BannerProduct";
import CategoryList from "../components/CategoryList";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProducts from "../components/VerticalCardProducts";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCardProduct category={"airpods"} heading="Top's Airpods" />
      <HorizontalCardProduct
        category={"mobiles"}
        heading="Popular Mobiles on Market"
      />
      <VerticalCardProducts category={"airpods"} heading="Popular Airpods " />
    </div>
  );
};

export default Home;
