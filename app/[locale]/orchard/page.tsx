import { GlobalNav } from "@/components/GlobalNav";

export default function OrchardPage() {
    return (
        <div className="min-h-screen bg-white">
            <GlobalNav />
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-4xl font-bold mb-4">🏠 Orchard: Career Paths</h1>
                <p className="text-xl text-gray-600">Harvest your potential with Dendrix Certification.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="p-8 bg-brand-teal/10 rounded-2xl border border-brand-teal/20">
                        <span className="text-4xl">🥋</span>
                        <h3 className="text-xl font-bold mt-4">AIKI</h3>
                        <p className="text-sm text-gray-500 mt-2">AI Knowledge Instructor</p>
                    </div>
                    <div className="p-8 bg-brand-cyan/10 rounded-2xl border border-brand-cyan/20">
                        <span className="text-4xl">🤖</span>
                        <h3 className="text-xl font-bold mt-4">AIVO</h3>
                        <p className="text-sm text-gray-500 mt-2">AI Voice Operator</p>
                    </div>
                    <div className="p-8 bg-purple-100 rounded-2xl border border-purple-200">
                        <span className="text-4xl">🎓</span>
                        <h3 className="text-xl font-bold mt-4">AIME</h3>
                        <p className="text-sm text-gray-500 mt-2">AI Mentor & Educator</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
