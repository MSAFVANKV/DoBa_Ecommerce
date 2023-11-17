import FooterItems from "./FooterItems";
import Item from "./FooterItems";
import { PRODUCTS, RESOURCES, COMPANY, SUPPORT } from "./FooterMenu";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <FooterItems Links={PRODUCTS} title="PRODUCTS" />
      <FooterItems Links={RESOURCES} title="RESOURCES" />
      <FooterItems Links={COMPANY} title="COMPANY" />
      <FooterItems Links={SUPPORT} title="SUPPORT" />
    </div>
  );
};

export default ItemsContainer;