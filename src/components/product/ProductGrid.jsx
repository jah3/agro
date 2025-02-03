// ProductGrid.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";

const ProductGrid = ({ selectedCategory, selectedSubcategory, productsData, setSelectedProduct }) => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="btn btn-secondary" onClick={() => navigate(-1)}>← Назад</button>
                <h2 className="text-center mb-0 flex-grow-1">{selectedSubcategory}</h2>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {productsData[selectedCategory].subcategories[selectedSubcategory].products.map((product) => (
                    <div key={product.id} className="col">
                        <div
                            className="card h-100 shadow-sm"
                            onClick={() => {
                                setSelectedProduct(product);
                                navigate(`/product/${product.id}`);
                            }}
                            style={{ cursor: 'pointer' }}
                        >
                            <img
                                src={product.image}
                                className="card-img-top object-fit-cover"
                                alt={product.name}
                                style={{ height: "200px" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted mb-0">
                                    <strong>Цена:</strong> от {product.min_price} руб
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;