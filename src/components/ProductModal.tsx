import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { Phone, X } from "lucide-react";
import YouTube from "react-youtube";
import { useState } from "react";
import Slider from "react-slick";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrow Components for Bigger Navigation Arrows
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full z-10 hover:bg-black"
    >
        ◀
    </button>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-full z-10 hover:bg-black"
    >
        ▶
    </button>
);

// 🖼 Lightbox Modal with Slider
function Lightbox({
    mediaItems,
    initialIndex,
    onClose,
    productName,
}: {
    mediaItems: string[];
    initialIndex: number;
    onClose: () => void;
    productName: string;
}) {

    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: initialIndex,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative p-4 max-w-4xl w-full">
                <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md z-10">
                    <X size={24} />
                </button>
                {/* 
                <h1 className="text-white text-center mb-4 text-xl font-semibold">
                    {productName}
                </h1> */}

                <Slider {...settings}>
                    {mediaItems.map((item, index) =>
                        item.includes("youtube") ? (
                            <div key={index} className="flex justify-center items-center w-full h-[500px]">
                                <YouTube
                                    videoId={item.split("v=")[1]?.split("&")[0]}
                                    className="w-full h-full"
                                    iframeClassName="w-full h-full" />
                            </div>
                        ) : (
                            <div key={index} className="flex justify-center items-center w-full h-[500px]">
                                <img
                                    src={item}
                                    alt="Preview"
                                    className="w-full h-full object-contain rounded-lg shadow-lg" />
                            </div>
                        )
                    )}
                </Slider>
            </div>
        </div>
    );
}

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Extract images & YouTube links
    const mediaItems = product.media && product.media.length > 0 ? product.media : [product.image]; // Fallback to single image

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50"
        >
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-[90vw] max-w-5xl max-h-[90vh] overflow-y-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <X size={28} />
                </button>

                {/* 📌 Product Information */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h2>
                </div>

                {/* 🖼 **Gallery Layout** */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4">
                    {mediaItems.map((item, index) => (
                        <div key={index} className="relative group cursor-pointer overflow-hidden">
                            {item.includes("youtube") ? (
                                <div className="w-full h-[200px] rounded-lg shadow-md bg-black flex items-center justify-center">
                                    <YouTube
                                        videoId={item.split("v=")[1]?.split("&")[0]}
                                        className="w-full h-full"
                                        opts={{ width: "100%", height: "100%" }}
                                        onClick={() => setLightboxIndex(index)}
                                    />
                                </div>
                            ) : (
                                <img
                                    src={item}
                                    alt={`Product ${index}`}
                                    className="w-full h-[200px] object-cover rounded-lg shadow-md transition transform hover:scale-105"
                                    onClick={() => setLightboxIndex(index)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="justify-items-center">
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{product.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Категория:</strong> {product.category}
                    </p>
                    {product.subcategory && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Подкатегория:</strong> {product.subcategory}
                        </p>
                    )}
                    <p className="font-bold text-green-600 dark:text-green-400 text-xl mt-3">{product.price} лв</p>


                    {/* Call Button */}
                    <a
                        href="tel:+359898447853"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-150 w-full justify-center"
                    >
                        <Phone size={16} />
                        +359 89 844 7853
                    </a>
                </div>

                {/* 🔍 **Lightbox Slider for viewing images/videos** */}
                {lightboxIndex !== null && (
                    <Lightbox
                        mediaItems={mediaItems}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        productName={product.name}
                    />
                )}

            </motion.div>
        </motion.div>
    );
}
