import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-xl mt-2">Oops! This page could not be found.</p>
            <Link href="/">
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                    Go Back Home
                </button>
            </Link>
        </div>
    );
}
