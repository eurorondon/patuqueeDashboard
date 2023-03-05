import React, { useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deliverOrder,
  getOrderDetails,
  paidConfirmOrder,
  payOrder,
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import axios from "axios";

const OrderDetailmain = (props) => {
  const { orderId } = props;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const producList = useSelector((state) => state.productList.products);

  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  const confirmpayHandler = () => {
    dispatch(paidConfirmOrder(order, producList));
  };
  const descontarhandle = async () => {
    // console.log(producList);
  };
  // console.log(order);
  // console.log(orderId);

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId, order));
    console.log("enviando");
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white">
          Back To Orders
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                >
                  <option>Change status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div>
            {order.isPaid && order.ConfirmandoPago ? (
              <div className="bg-success">
                <p className="text-white text-center ">Pago Exitoso</p>
              </div>
            ) : order.isPaid ? (
              <div className="bg-warning">
                <p className=" text-center  ">Pago por Validar</p>
              </div>
            ) : (
              <div className="bg-black">
                <p className="text-white text-center ">No Pagado</p>
              </div>
            )}
          </div>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>

              {/* Payment Info */}
              {/* <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isDelivered ? (
                    
                  ) : (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        MARK AS DELIVERED
                      </button>
                    </>
                  )}
                </div>
              </div> */}

              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {order.isPaid && !order.isDelivered ? (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        MARK AS DELIVERED
                      </button>
                    </>
                  ) : order.isDelivered ? (
                    <>
                      <div className="btn btn-success col-12">
                        DELIVERED AT (
                        {moment(order.isDeliveredAt).format("MMM Do YY")})
                      </div>
                    </>
                  ) : null}
                </div>
              </div>

              <>
                {order.isPaid ? null : (
                  <div>
                    <p className="text-center">
                      Si el cliente ha pagado en la tienda fisica, confirma el
                      pago aqui.
                    </p>

                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          successPaymentHandler();
                          confirmpayHandler();
                        }}
                      >
                        Confirma el Pago
                      </button>
                    </div>
                  </div>
                )}
              </>

              <>
                {order.isPaid && order.ConfirmandoPago ? null : order.isPaid ? (
                  <div className="">
                    <p className="text-center">
                      El cliente ha marcado como pagado, haz click aqui si ya
                      confirmastes el pago.
                    </p>
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={confirmpayHandler}
                        className="btn btn-warning "
                      >
                        Confirmar el Pago
                      </button>
                    </div>
                  </div>
                ) : null}
              </>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
