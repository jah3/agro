// CategoryGrid.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryGrid = ({ productsData, handleCategorySelect }) => {
    return (
        <div>
            <h2 className="text-center mb-4">Выберите категорию</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {Object.entries(productsData).map(([category, data]) => (
                    <div key={category} className="col">
                        <div
                            className="card h-100 shadow-sm"
                            onClick={() => handleCategorySelect(category)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={data.image}
                                className="card-img-top object-fit-cover"
                                alt={category}
                                style={{ height: "200px" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">{category}</h5>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryGrid;