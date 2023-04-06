import React, { useEffect, useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import ReactPaginate from "react-paginate";
import { ArrowBack, ArrowForward, Search } from "@material-ui/icons";

const MainProducts = () => {
  const dispatch = useDispatch();
  let history = useHistory();

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

  useEffect(() => {
    console.log(category);
    dispatch(listProducts(keyword, category));
  }, [dispatch, keyword, category]);

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(24);
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const totalPosts = products.length;

  // DESDE AQUI FUNCIONA LA PAGINAGION

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  useEffect(() => {
    const storedPage = localStorage.getItem("currentPage");
    if (storedPage) {
      setCurrentPage(JSON.parse(storedPage));
    } else {
      setCurrentPage(location.state?.currentPage || 0);
    }
  }, [location.state?.currentPage]);

  const url = window.location.href;
  const match = url.match(/\d+$/);

  useEffect(() => {
    if (url.includes("page")) {
      const match = url.match(/\d+$/);
      setCurrentPage(match[0] * 1);
    }
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
    scroll(0, 0);
    history.push(`?page=${selectedPage}`);
  };

  //AQUI TERMINA FUNCIONES DE PAGINACION

  const submitHandler = (e) => {
    e.preventDefault();
    setKeyword(search);
    setCurrentPage(0);
  };
  const handleCategoria = (e) => {
    setCategory(e.target.value);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Productos</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Nuevo Producto
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <form action="" onSubmit={submitHandler}>
              <div className="col-lg-4 col-md-6 me-auto ">
                <div className="d-flex">
                  <input
                    type="search"
                    placeholder="Buscar..."
                    className="form-control p-2"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div>
                    <button className="btn btn-success p-2" type="submit">
                      <Search />
                    </button>
                  </div>
                </div>
              </div>
              <div className=""></div>
              <div>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => setKeyword("")}
                >
                  Reset Busqueda
                </button>
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
            previousLabel={<ArrowBack />}
            nextLabel={<ArrowForward />}
            totalPosts={products.length}
            pageCount={Math.ceil(totalPosts / postsPerPage)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3} // Aquí estableces el número de botones de página a mostrar
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
