import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
                <div className="flex justify-center mb-4 text-red-500">
                    <ShieldAlert className="w-16 h-16" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Access Denied
                </h1>
                <p className="text-gray-600 mb-6">
                    You do not have permission to view this page.
                </p>
                <Link href="/dashboard">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow transition duration-200">
                        Return to Dashboard
                    </button>
                </Link>
            </div>
        </div>
    );
}
