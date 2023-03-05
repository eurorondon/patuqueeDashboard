import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setPhoto("");
      setCategory("");
      setCategory2("");
      setCategory3("");
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct(
        photo,
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
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
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
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id=""
                      // required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Category 2
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      // required
                      value={category2}
                      onChange={(e) => setCategory2(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Category 3
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      // required
                      value={category3}
                      onChange={(e) => setCategory3(e.target.value)}
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
                      // required
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
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      // required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <label className="form-label">Images2</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image2}
                      // required
                      onChange={(e) => setImage2(e.target.value)}
                    />
                    <label className="form-label">Images3</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image3}
                      // required
                      onChange={(e) => setImage3(e.target.value)}
                    />
                    <label className="form-label">Images4</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image4}
                      // required
                      onChange={(e) => setImage4(e.target.value)}
                    />
                    <input
                      className="form-control mt-3"
                      type="file"
                      name="photo"
                      multiple
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
