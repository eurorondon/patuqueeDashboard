import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
} from "../Constants/CategoryConstants";
import axios from "axios";
import { logout } from "./userActions";
import { URL } from "./../Url";

export const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get(`${URL}/api/category`);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message,
    });
  }
};

// CREATE CATEGORY
export const createCategory = (categoria, descripcion) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

    const form = new FormData();
    form.append("categoria", categoria);
    form.append("descripcion", descripcion);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(`${URL}/api/category/add`, form, config);

    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};
