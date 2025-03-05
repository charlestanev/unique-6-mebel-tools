import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import YouTube from "react-youtube";
import { useState } from "react";

// Lightbox Modal for viewing media
function Lightbox({ src, type, onClose }: { src: string; type: "image" | "video"; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative p-4 max-w-4xl w-full flex justify-center">
                <button onClick={onClose} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                    <X size={24} />
                </button>
                {type === "image" ? (
                    <img src={src} alt="Preview" className="max-w-full max-h-screen object-contain" />
                ) : (
                    <YouTube videoId={src.split("v=")[1]?.split("&")[0]} className="w-full max-w-4xl aspect-video" />
                )}
            </div>
        </div>
    );
}

interface ProductModalProps {
    product: Product;
    onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
    const [lightbox, setLightbox] = useState<{ src: string; type: "image" | "video" } | null>(null);

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

                {/* Product Information */}
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

                {/* 🖼 Gallery Layout */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((img, index) => (
                        <div key={index} className="relative group cursor-pointer">
                            <img
                                src={img}
                                alt={`Product ${index}`}
                                className="w-full h-auto object-cover rounded-lg shadow-md transition transform hover:scale-105"
                                onClick={() => setLightbox({ src: img, type: "image" })}
                            />
                        </div>
                    ))}
                    {videos.map((video, index) => {
                        const videoId = video.split("v=")[1]?.split("&")[0]; // Extract YouTube Video ID
                        return (
                            <div key={index} className="relative group cursor-pointer">
                                <YouTube
                                    videoId={videoId}
                                    className="w-full h-auto aspect-video rounded-lg shadow-md transition transform hover:scale-105"
                                    onClick={() => setLightbox({ src: video, type: "video" })}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Lightbox for viewing images/videos */}
                {lightbox && <Lightbox src={lightbox.src} type={lightbox.type} onClose={() => setLightbox(null)} />}
            </motion.div>
        </motion.div>
    );
}
