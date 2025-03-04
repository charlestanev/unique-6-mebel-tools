import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Slider from "react-slick";
import YouTube from "react-youtube";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    // Extract images & YouTube links
    const mediaItems = product.media || [product.image]; // Fallback to single image
    const images = mediaItems.filter((item) => !item.includes("youtube"));
    const videos = mediaItems.filter((item) => item.includes("youtube"));

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
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 w-[85vw] h-[85vh] relative flex flex-col"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                    <X size={28} />
                </button>

                {/* Slider */}
                <div className="w-full h-2/5">
                    <Slider {...settings}>
                        {images.map((img, index) => (
                            <div key={index} className="flex justify-center">
                                <img src={img} alt={`Product ${index}`} className="h-full max-h-72 object-contain mx-auto" />
                            </div>
                        ))}
                        {videos.map((video, index) => {
                            const videoId = video.split("v=")[1]?.split("&")[0]; // Extract YouTube Video ID
                            return (
                                <div key={index} className="flex justify-center">
                                    <YouTube videoId={videoId} className="w-full max-w-3xl mx-auto" />
                                </div>
                            );
                        })}
                    </Slider>
                </div>

                {/* Product Information */}
                <div className="mt-4 flex-grow overflow-y-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{product.name}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">{product.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        <strong>Категория:</strong> {product.category}
                    </p>
                    {product.subcategory && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Подкатегория:</strong> {product.subcategory}
                        </p>
                    )}
                    <p className="font-bold text-green-600 dark:text-green-400 text-lg mt-3">{product.price} лв</p>
                </div>
            </motion.div>
        </motion.div>
    );
}
