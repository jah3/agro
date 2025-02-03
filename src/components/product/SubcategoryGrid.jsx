// SubcategoryGrid.jsx
import React from 'react';

const SubcategoryGrid = ({ selectedCategory, productsData, handleSubcategorySelect, handleBack }) => (
    <div>
        <div className="d-flex align-items-center gap-3 mb-4">
            <button className="btn btn-secondary" onClick={handleBack}>← Назад</button>
            <h2 className="text-center mb-0 flex-grow-1">Выберите подкатегорию</h2>
        </div>
        <div className="row row-cols-2 row-cols-md-3 g-4">
            {Object.entries(productsData[selectedCategory].subcategories).map(([subcategory, data]) => (
                <div key={subcategory} className="col">
                    <div
                        className="card h-100 shadow-sm"
                        onClick={() => handleSubcategorySelect(subcategory)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={data.image}
                            className="card-img-top object-fit-cover"
                            alt={subcategory}
                            style={{ height: "200px" }}
                        />
                        <div className="card-body text-center">
                            <h5 className="card-title mb-0">{subcategory}</h5>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SubcategoryGrid;