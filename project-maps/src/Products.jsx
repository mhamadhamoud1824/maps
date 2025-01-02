import React, { useEffect, useState } from "react";
import axios from "axios";

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://dummyjson.com/products");
                setProducts(response.data.products);
            } catch (error) {
                setError("Error fetching data");
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-bold">...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold text-center mb-8">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 bg-white"
                    >
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-t-md"
                        />
                        <div className="mt-4">
                            <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                {product.description}
                            </p>
                            <p className="text-sm font-semibold">
                                <span className="text-gray-500">Category: </span>
                                {product.category}
                            </p>
                            <p className="text-sm font-semibold">
                                <span className="text-gray-500">Price: </span>${product.price}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
