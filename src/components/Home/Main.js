import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import LatestOrder from "./LatestOrder";
import SaleStatistics from "./SalesStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../../Redux/Actions/CategoryActions";

const Main = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Panel Admin </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={orders} products={products} />

        {/* <div className="row">
          <SaleStatistics />
          <ProductsStatistics />
        </div> */}

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default Main;
