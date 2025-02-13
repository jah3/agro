// CategoryGrid.jsx
import React from "react";
import { motion } from "framer-motion";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryGrid = ({ productsData, handleCategorySelect }) => {
    const carouselImages = [
        "/garden-banner-08.jpg",
        "/garden-banner-03.jpg"
    ];

    return (
        <div>
            <h2 className="text-center mb-4">Выберите категорию</h2>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                {Object.entries(productsData).map(([category, data], index) => (
                    <motion.div
                        key={category}
                        className="col"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <div
                            className="card h-100 shadow-sm"
                            onClick={() => handleCategorySelect(category)}
                            style={{ cursor: "pointer" }}
                        >
                            <motion.img
                                src={data.image}
                                className="card-img-top object-fit-cover"
                                alt={category}
                                style={{ height: "200px" }}
                                whileHover={{ scale: 1.05 }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title mb-0">{category}</h5>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Carousel Section */}
            <div className="mt-5">
                <Carousel>
                    {carouselImages.map((image, idx) => (
                        <Carousel.Item key={idx}>
                            <img
                                className="d-block w-100"
                                src={image}
                                alt={`Slide ${idx + 1}`}
                                style={{ height: "300px", objectFit: "cover", borderRadius: "12px" }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default CategoryGrid;
