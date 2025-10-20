'use client';
import { useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function AdminVerifyPage() {
    // Hooks must be called unconditionally at the top level
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');

    // Only show this page if it's /admin/verify
    if (params.id !== 'verify') return null;

    const nextPath = searchParams.get('next') || '/admin';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return; // Only allow digits

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        // Auto-focus to next input
        if (value && index < pin.length - 1) {
            const nextInput = document.getElementById(`pin-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredPin = pin.join('');
        const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || '123456';

        if (enteredPin === correctPin) {
            localStorage.setItem('admin_verified', 'true');
            router.push(nextPath);
        } else {
            setError('Incorrect PIN. Please try again.');
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-black">
            <div className="flex flex-col items-center gap-6 p-8 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-white text-2xl font-semibold">Admin Access</h1>

                <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {pin.map((value, index) => (
                            <input
                                key={index}
                                id={`pin-${index}`}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) => handleChange(e, index)}
                                className="w-12 h-12 text-center text-white bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-6 py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-all"
                    >
                        Verify
                    </button>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>
        </main>
    );
}
