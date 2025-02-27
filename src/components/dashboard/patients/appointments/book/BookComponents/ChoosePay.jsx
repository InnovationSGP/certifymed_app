'use client';
import { insuranceProviders } from '@/components/common/Helper';
import { WalletIcon } from '@/components/common/Icons';
import PaymentForm from '@/components/common/PaymentForm';
import { setSessionStorageItem } from '@/lib/sessionStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import PayOutOfPocket from './PayOutOfPocketComponent';

export default function ChoosePay() {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [isPayOutOfPocket, setIsPayOutOfPocket] = useState(false);
    const [pocketPayDetails, setPocketPayDetails] = useState({
        paymentMethod: '',
        amount: 100,
        currency: 'Indian Rupee',
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
        setSessionStorageItem('paymentData', JSON.stringify(pocketPayDetails));
        const newParams = new URLSearchParams(searchParams);
        newParams.set('tab', 'datetime'.toString());
        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    const handleContinueIn = () => {
        setSessionStorageItem(
            'paymentData',
            JSON.stringify({ ...pocketPayDetails, paymentMethod: 'Insurance' })
        );
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
        <div className="w-full mx-auto mb-24 space-y-8 sm:w-11/12">
            <div className="bg-white rounded-[12px] shadow-tab p-3 sm:p-4 md:px-6 md:pb-12 md:pt-6">
                <div className="flex justify-between items-center mb-4 ">
                    <h2 className="text-lg font-semibold sm:text-xl font-poppins text-secondary inline">
                        How would you like to pay?
                    </h2>
                    <span className="text-right block font-semibold">
                        Amount ₹ {pocketPayDetails.amount}
                    </span>
                </div>
                <div value={selectedMethod} onClick={handlePaymentMethodChange}>
                    <div className="space-y-6">
                        <button
                            onClick={() => {
                                setIsPayOutOfPocket(true);
                            }}
                            className="flex items-center w-full p-3 space-x-3 border border-gainsboro sm:p-4 rounded-xl"
                        >
                            <WalletIcon />
                            <p
                                className="text-base font-poppins text-secondary"
                                htmlFor="pocket"
                            >
                                Pay out of Pocket
                            </p>
                        </button>
                        <div className="space-y-2 sm:space-y-4">
                            <div className="flex items-center space-x-3">
                                <label
                                    className="text-base font-poppins text-secondary"
                                    htmlFor="insurance"
                                >
                                    Use my insurance
                                </label>
                            </div>

                            <div className="grid items-center justify-center grid-cols-2 gap-3 md:grid-cols-4 sm:gap-4">
                                {insuranceProviders.map((provider, index) => (
                                    <button
                                        onClick={() =>
                                            handleContinueIn(provider)
                                        } // ✅ Fix: Arrow function to avoid immediate execution
                                        key={index}
                                        className="border border-gainsboro rounded-[12px] px-4 min-h-[60px] sm:min-h-[80px] flex items-center justify-center hover:border-blue-500 cursor-pointer"
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
