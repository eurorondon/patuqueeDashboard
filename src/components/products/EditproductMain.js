import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Undo } from "@material-ui/icons";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [categories2, setCategories2] = useState("");
  const [categories3, setCategories3] = useState("");
  const [catTotal, setCatTotal] = useState([]);
  const [photos, setPhotos] = useState(null);

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Producto actualizado", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        if (product.photo && product.photo.length > 1) {
          setPhotos(product.photo[0].url);
        }
        setPrice(product.price);
        setCategories(product.categories[0]);
        setCategories2(product.categories[1]);
        setCategories3(product.categories[2]);
      }
    }
  }, [product, dispatch, productId, successUpdate]);

  const array = [image, image2, image3, image4];
  const filteredArray = array.filter(Boolean);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        countInStock,
        categories:
          (categories ?? "").charAt(0).toUpperCase(1) +
          (categories2 ?? "").slice(1),

        // Este código asigna una cadena vacía ('') a la variable categories2 si es null o undefined, lo que permite que la función slice() se llame sin causar un error.

        categories2:
          (categories2 ?? "").charAt(0).toUpperCase(1) +
          (categories2 ?? "").slice(1),

        categories3:
          (categories3 ?? "").charAt(0).toUpperCase(1) +
          (categories2 ?? "").slice(1),

        // categories2.charAt(0).toUpperCase(1) + categories2.slice(1),
        // categories3.charAt(0).toUpperCase(1) + categories3.slice(1),

        photos,
      })
    );
  };

  const handleChange = (e) => {
    const selectedFiles = e.target.files;
    // como selectedFiles es un objeto, debemos convertirlo en arreglo
    const filesArray = Array.from(selectedFiles);
    setPhotos(filesArray);
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <div
              className="btn btn-danger text-white"
              onClick={() => window.history.go(-1)}
            >
              <Undo className="me-1" />
              Atrás
            </div>
            {/* <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link> */}
            <h2 className="content-title">Editar Producto</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publicar
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Product title
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          // required
                          value={categories}
                          onChange={(e) => setCategories(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories2
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id=""
                          // required
                          value={categories2}
                          onChange={(e) => setCategories2(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_title" className="form-label">
                          Categories3
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id=""
                          // required
                          value={categories3}
                          onChange={(e) => setCategories3(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Count In Stock
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea
                          placeholder="Type here"
                          className="form-control"
                          rows="7"
                          // required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        {product.photo && product.photo.length && (
                          <div className="grid ">
                            {Object.values(product.photo).map((photoUrl) => (
                              <div className=" " style={{ maxWidth: "10rem" }}>
                                <img
                                  key={photoUrl}
                                  src={photoUrl.url}
                                  alt="Product"
                                  style={{ maxWidth: "10rem" }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <input
                          className="form-control mt-3"
                          type="file"
                          name="photo"
                          multiple
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
