import {
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../Constants/OrderConstants";
import { logout } from "./userActions";
import axios from "axios";
import { URL } from "./../Url";

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/orders/all`, config);
    // console.log(data);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${URL}/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/orders/${order._id}/delivered`,
      {},
      config
    );
    console.log(data);
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};

// ORDER PAY
export const payOrder = (orderId, order) => async (dispatch, getState) => {
  const userName = order.user.name;
  const email = order.user.email;
  const { totalPrice, _id } = order;

  try {
    dispatch({ type: ORDER_PAY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/orders/${orderId}/pay`,
      {},
      config
    );

    console.log(data);
    console.log("enviado a pay");

    try {
      const datas = {
        totalPrice,
        _id,
        userName,
        email,
      };
      const sendMail = await axios.post(`${URL}/api/orders/send`, datas);
      console.log(sendMail);
    } catch (error) {
      alert(error.response.data.message);
    }

    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    console.log("pagado");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

// PAIDCONFIRM
export const paidConfirmOrder =
  (order, producList) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERED_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${URL}/api/orders/${order._id}/confirmpay`,
        {},
        config
      );

      console.log(data);

      //AQUI INICIA LA RESTA DEL PRODUCTO VENDIO AL STOCK
      const { orderItems } = order;

      const restarStock = () => {
        // console.log("entrando en resta de producto");

        try {
          orderItems.map((item) => {
            const idVendido = item.product;
            const qtyVendido = item.qty;
            // console.log(idVendido);
            // console.log(qtyVendido);

            const productVendido = producList.find(
              (product) => product._id === idVendido
            );
            // console.log(productVendido);

            const countInStock = productVendido.countInStock;
            const resta = (countInStock - qtyVendido).toString();
            console.log("deberia ser un string= ", resta);
            const restar = { countInStock: resta };
            console.log(restar);

            const send = async () => {
              const resData = await axios.put(
                `${URL}/api/products/${idVendido}`,
                restar,
                config
              );
              console.log(resData);
            };
            send();
          });
        } catch (error) {
          console.log(error);
        }
      };
      restarStock();

      dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: ORDER_DELIVERED_FAIL,
        payload: message,
      });
      console.log(getOrderDetails);
    }
  };
