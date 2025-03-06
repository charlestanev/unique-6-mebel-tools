import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import YouTube from "react-youtube";
import { useState } from "react";
import Slider from "react-slick";

// Import slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🖼 Lightbox Modal with Slider
function Lightbox({ mediaItems, initialIndex, onClose }: { mediaItems: string[]; initialIndex: number; onClose: () => void }) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: initialIndex,
        arrows: true,
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative p-4 max-w-4xl w-full">
                <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md z-10">
                    <X size={24} />
                </button>
                <Slider {...settings}>
                    {mediaItems.map((item, index) =>
                        item.includes("youtube") ? (
                            <div key={index} className="flex justify-center">
                                <YouTube videoId={item.split("v=")[1]?.split("&")[0]} className="w-full max-w-4xl aspect-video" />
                            </div>
                        ) : (
                            <div key={index} className="flex justify-center">
                                <img src={item} alt="Preview" className="max-w-full max-h-screen object-contain rounded-lg shadow-lg" />
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
                </div>

                {/* 🖼 **Gallery Layout** */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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

                {/* 🔍 **Lightbox Slider for viewing images/videos** */}
                {lightboxIndex !== null && (
                    <Lightbox mediaItems={mediaItems} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
                )}
            </motion.div>
        </motion.div>
    );
}
