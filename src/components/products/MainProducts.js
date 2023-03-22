import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";

const MainProducts = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, successDelete]);

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(24);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = products.length;

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    scroll(0, 0);
    // history.push(`?page=${selectedPage}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setKeyword(search);
  };
  const handleCategoria = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    console.log(category);
    dispatch(listProducts(keyword, category));
  }, [dispatch, keyword, category]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <form action="" onSubmit={submitHandler}>
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div> */}

              {/* <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div> */}
              {/* <div>
                <select name="categoria" id="" onChange={handleCategoria}>
                  <option disabled selected value="">
                    Seleccione una categoría
                  </option>
                  <option value="">Todos</option>
                  <option value="Conservadores">Conservadores</option>
                  <option value="Vasos">Vasos</option>
                  <option value="Poncheras">Poncheras</option>
                  <option value="Aluminio">Aluminio</option>
                  <option value="Tobos">Tobos</option>
                  <option value="Bigmark">Bigmark</option>
                  <option value="Inplast">Inplast</option>
                  <option value="Adonis">Adonis</option>
                  <option value="IPM">IPM</option>
                </select>
              </div> */}
            </form>
            <div>
              <button
                className="btn btn-danger mt-3"
                onClick={() => setKeyword("")}
              >
                Reset Busqueda
              </button>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {currentPosts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}

          <ReactPaginate
            containerClassName={"pagination"}
            activeClassName={"active"}
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalPosts / postsPerPage)}
            previousLabel="< prev"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
