export default function AdminFooter() {
    return (
        <footer className="bg-white dark:bg-gray-900 text-center py-4 text-gray-600 dark:text-gray-300 shadow-md">
            <p>&copy; {new Date().getFullYear()} Admin Panel - Всички права запазени.</p>
        </footer>
    );
}
