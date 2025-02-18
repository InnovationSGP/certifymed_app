'use client';

import { useState } from 'react';
import PaymentForm from '@/components/common/PaymentForm';
import { Wallet } from 'lucide-react';
import { Input } from '@/components/common/Input';
import { useSearchParams, useRouter } from 'next/navigation';

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

    const insuranceProviders = [
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' },
        { name: 'Aetna', logo: 'aetna' },
        { name: 'Anthem', logo: 'anthem' }
    ];

    if (isPayOutOfPocket) {
        return (
            <div className="w-11/12 text-black p-4 px-6 bg-white rounded-xl shadow-md mb-24">
                <p className="text-2xl font-medium mt-4">Payment Methods</p>
                <div className="flex flex-col md:flex-row w-full justify-between gap-3 mt-4">
                    {['Debit Card', 'Credit Card', 'Paypal'].map(
                        (item, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        type: item
                                    }));
                                }}
                                className={`border min-w-56 rounded-lg p-4 flex items-center justify-center ${pocketPayDetails.type === item ? "bg-[#293991] text-white" : "bg-white"} cursor-pointer`}
                            >
                                <span
                                    className={`font-semibold`}
                                >
                                    {item}
                                </span>
                            </button>
                        )
                    )}
                </div>
                <div className="flex flex-col my-6 mt-6 gap-4">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-12">
                        <div className="w-full">
                            <label>First name</label>
                            <Input
                                value={pocketPayDetails.firstName}
                                placeholder="Enter your name"
                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        firstName: e.target.value
                                    }));
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <label>Last name</label>
                            <Input
                                value={pocketPayDetails.lastName}
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        lastName: e.target.value
                                    }));
                                }}
                                placeholder="Enter your last name"
                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-12">
                        <div className="w-full">
                            <label>Credit Card Number</label>
                            <Input
                                value={pocketPayDetails.creditCardNumber}
                                type={'number'}
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        creditCardNumber: e.target.value
                                    }));
                                }}
                                placeholder="1234"
                                className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                            />
                        </div>
                        <div className="w-full flex justify-between gap-6">
                            <div className="w-full">
                                <label>CVV</label>
                                <Input
                                    value={pocketPayDetails.cvv}
                                    type={'number'}
                                    onChange={(e) => {
                                        setPocketPayDetails((prevDetails) => ({
                                            ...prevDetails,
                                            cvv: e.target.value
                                        }));
                                    }}
                                    placeholder="CVV"
                                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                />
                            </div>
                            <div className="w-full">
                                <label>MM</label>
                                <Input
                                    value={pocketPayDetails.mm}
                                    type={'number'}
                                    onChange={(e) => {
                                        setPocketPayDetails((prevDetails) => ({
                                            ...prevDetails,
                                            mm: e.target.value
                                        }));
                                    }}
                                    placeholder="MM"
                                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                />
                            </div>
                            <div className="w-full">
                                <label>YYYY</label>
                                <Input
                                    value={pocketPayDetails.yyyy}
                                    type={'number'}
                                    onChange={(e) => {
                                        setPocketPayDetails((prevDetails) => ({
                                            ...prevDetails,
                                            yyyy: e.target.value
                                        }));
                                    }}
                                    placeholder="YYYY"
                                    className="h-[60px] rounded-[12px] bg-[#F1F1F1]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleContinue}
                    className="text-center bg-[#293991] h-[60px] w-full md:w-min md:px-40 rounded-[12px] text-white"
                >
                    Submit
                </button>
            </div>
        );
    }

    return (
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
                                        className="border rounded-lg p-4 flex items-center justify-center hover:border-blue-500 cursor-pointer"
                                    >
                                        <span
                                            className={`text-${
                                                provider.logo === 'aetna'
                                                    ? 'purple'
                                                    : 'blue'
                                            }-600 font-semibold`}
                                        >
                                            {provider.name}
                                        </span>
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
