import { GlobalNav } from "@/components/GlobalNav";

export default function FruitsPage() {
    return (
        <div className="min-h-screen bg-white">
            <GlobalNav />
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold mb-4">🍎 Fruits: Applications</h1>
                <p className="text-xl text-gray-600">Apply your knowledge to create value.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                        <span className="text-4xl">✍️</span>
                        <h3 className="text-xl font-bold mt-4">Writing & Copy</h3>
                    </div>
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
                        <span className="text-4xl">📊</span>
                        <h3 className="text-xl font-bold mt-4">Data Analysis</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
