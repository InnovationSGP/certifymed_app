'use client';

import { useState } from 'react';
import PaymentForm from '@/components/common/PaymentForm';
import { Wallet } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { useSearchParams, useRouter } from 'next/navigation';
import PayOutOfPocket from './PayOutOfPocketComponent';
import { insuranceProviders } from '@/components/common/Helper';

export default function ChoosePay() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [isPayOutOfPocket, setIsPayOutOfPocket] = useState(false);
    const [pocketPayDetails, setPocketPayDetails] = useState({
        type: '',
        firstName: '',
        lastName: '',
        creditCardNumber: 0,
        cvv: 0,
        mm: 0,
        yyyy: 0
    });
    const searchParams = useSearchParams();
    const router = useRouter();

    const handlePaymentMethodChange = (value) => {
        setSelectedMethod(value);
        if (value === 'pocket') {
            setShowPaymentForm(true);
        } else {
            setShowPaymentForm(false);
        }
    };

    const handleContinue = () => {
        sessionStorage.setItem('pocketPay', pocketPayDetails);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', 'datetime'.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const handleContinueIn = (provider) => {
        // Remove {} to pass correctly
        sessionStorage.setItem('insuranceName', provider?.name);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', 'datetime');
        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    return isPayOutOfPocket ? (
        <PayOutOfPocket
            pocketPayDetails={pocketPayDetails}
            setPocketPayDetails={setPocketPayDetails}
            handleContinue={handleContinue}
        />
    ) : (
        <div className="w-11/12 mx-auto space-y-8 mb-24 shadow-md">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">
                    How would you like to pay?
                </h2>
                <div value={selectedMethod} onClick={handlePaymentMethodChange}>
                    <div className="space-y-6">
                        <button
                            onClick={() => {
                                setIsPayOutOfPocket(true);
                            }}
                            className="flex w-full items-center space-x-3 border p-4 rounded-xl"
                        >
                            <div className="p-2 rounded-lg bg-blue-300">
                                <Wallet className="h-6 w-6 text-blue-700" />
                            </div>
                            <p htmlFor="pocket">Pay out of Pocket</p>
                        </button>

                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <label htmlFor="insurance">
                                    Use my insurance
                                </label>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-center">
                                {insuranceProviders.map((provider, index) => (
                                    <button
                                        onClick={() =>
                                            handleContinueIn(provider)
                                        } // ✅ Fix: Arrow function to avoid immediate execution
                                        key={index}
                                        className="border rounded-lg px-4 min-h-[80px] flex items-center justify-center hover:border-blue-500 cursor-pointer"
                                    >
                                        <img
                                            className={`${
                                                provider.name === 'Aetna'
                                                    ? 'h-12'
                                                    : 'h-6'
                                            } w-auto object-contain`}
                                            src={provider.logo}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showPaymentForm && <PaymentForm />}
        </div>
    );
}
