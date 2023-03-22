import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./userActions";
import { URL } from "./../Url";

export const listProducts =
  (keyword = "", pageNumber = "", category = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}&category=${category}`,
        config
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${URL}/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct =
  (
    photos,
    name,
    price,
    description,
    image,
    image2,
    image3,
    image4,
    countInStock,
    category,
    category2,
    category3
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const form = new FormData();

      form.append("name", name);
      form.append("price", price);
      form.append("countInStock", countInStock);
      form.append("description", description);
      // form.append("photo", photo);
      form.append("categories", category);
      form.append("categories", category2);
      form.append("categories", category3);

      photos.forEach((photo) => {
        form.append("photo", photo);
      });

      const { data } = await axios.post(`${URL}/api/products/`, form, config);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };
// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    const { data } = await axios.get(`${URL}/api/products/${id}`);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
  const {
    categories,
    categories2,
    categories3,
    countInStock,
    description,
    name,
    price,
    photos,
  } = product;
  const form = new FormData();

  form.append("name", name);
  form.append("price", price);
  form.append("countInStock", countInStock);
  form.append("description", description);
  form.append("categories", categories);
  form.append("categories", categories2);
  form.append("categories", categories3);

  // photos.forEach((photo) => {
  //   form.append("photo", photo);
  //   console.log(photo);
  // });
  if (Array.isArray(photos)) {
    photos.forEach((photo) => {
      form.append("photo", photo);
    });
  }

  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${URL}/api/products/${product._id}`,
      form,
      config
    );

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
