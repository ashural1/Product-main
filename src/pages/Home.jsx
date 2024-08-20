import axiosClient from "../utils/axios";
import { useEffect, useState, useRef } from "react";

function Home() {
  const [product, setProducts] = useState([]);
  const [error, setError] = useState(null); // State for error messages
  const nameRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    axiosClient
      .get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => setProducts(data.data.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        if (error.response && error.response.status === 403) {
          setError("Access denied. You do not have permission to view these products.");
        } else {
          setError("An error occurred while fetching products.");
        }
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    const newProduct = {
      name: nameRef.current.value,
      price: priceRef.current.value,
    };

    axiosClient
      .post("/products", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Add the new product to the list of products
        setProducts((prevProducts) => [...prevProducts, response.data]);
        
        // Clear the form fields
        nameRef.current.value = "";
        priceRef.current.value = "";

        console.log("Product added:", response.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        if (error.response && error.response.status === 403) {
          setError("Access denied. You do not have permission to add products.");
        } else {
          setError("An error occurred while adding the product.");
        }
      });
  };

  const handleDelete = (id) => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      setError("Authorization token is missing.");
      return;
    }

    axiosClient
      .delete("/products/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Product deleted:", response.data);
        // Update the product list after deletion
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        setError("An error occurred while deleting the product.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <input className="input input-bordered w-full max-w-xs " type="text" ref={nameRef} placeholder="Product Name" />
          </div>
          <div>
            <input className="input input-bordered w-full max-w-xs" type="text" ref={priceRef} placeholder="Product Price" />
          </div>
          <button type="submit" className="btn btn-secondary mt-2">
            Add Product
          </button>
        </form>
      </div>
      {error && <div className="text-red-500">{error}</div>} {/* Display error messages */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  ml-10">
        {product &&
          product.map((product) => {
            return (
              <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={product.images} />
                </figure>
                <div className="card-body">
                  <h1 className="card-title">{product.name}</h1>
                  <p>{product.facts}</p>
                  <h2>{product.brand}</h2>
                  <p>${product.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Learn now!</button>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-danger mt-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
