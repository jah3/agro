import React, { useState } from 'react';

const SubcategoryGrid = ({ selectedCategory, productsData, handleSubcategorySelect, handleBack }) => {
    const subcategories = Object.entries(productsData[selectedCategory].subcategories);
    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(subcategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = subcategories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <div className="d-flex align-items-center gap-3 mb-4">
                <button className="btn btn-secondary" onClick={handleBack}>← Назад</button>
                <h2 className="text-center mb-0 flex-grow-1">Выберите подкатегорию</h2>
            </div>
            <div className="row row-cols-2 row-cols-md-3 g-4">
                {currentItems.map(([subcategory, data]) => (
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
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ← Назад
                </button>
                <span className="align-self-center">Страница {currentPage} из {totalPages}</span>
                <button
                    className="btn btn-outline-primary ms-2"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Вперед →
                </button>
            </div>
        </div>
    );
};

export default SubcategoryGrid;
