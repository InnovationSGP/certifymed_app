'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/select';
import { Button } from '@/components/common/button';
import {
    Avatar,
    AvatarImage
} from '@/components/common/avatar';
import { useState } from 'react';

export default function ChooseProvider({ tabNumber }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [city, setCity] = useState();

    const providers = Array(8).fill(
        'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsX29mZmljZV8yN19yZWFsaXN0aWNfcGhvdG9fb2Zfc21pbGluZ19oYW5kc29tZV95b3VuZ19pbl8xNWExMTE1ZC0xZTBiLTQ4YjAtOGEyNi01ZDE1ZmE3Njg2MzYucG5n.png'
    );

    const handleContinue = () => {
        if (city) {
            // Update URL to set the next tab and store city
            const newParams = new URLSearchParams(searchParams);
            newParams.set('tab', (parseInt(tabNumber) + 1).toString());
            router.push(`?${newParams.toString()}`, { scroll: false });
        } else {
            alert('Please Enter the Required Details');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mb-24">
            {/* Avatar group */}
            <div className="flex justify-center -space-x-4 mb-6">
                {providers.map((provider, index) => (
                    <Avatar
                        key={index}
                        className="w-10 h-10 border-2 border-white"
                    >
                        <AvatarImage
                            src={provider}
                            alt={`Provider ${index + 1}`}
                        />
                    </Avatar>
                ))}
            </div>

            <h2 className="text-2xl font-semibold text-center mb-2">
                Find a provider in your area
            </h2>

            <div className="space-y-4 mt-8">
                <div className="my-4">
                    <p className="text-sm font-medium mb-1 pl-1">City</p>
                    <Select
                        onValueChange={(value) => {
                            setCity(value);
                        }}
                    >
                        <SelectTrigger className="w-full bg-[#F1F1F1] h-12">
                            <SelectValue placeholder={city || 'Select'} />
                        </SelectTrigger>
                        <SelectContent className="bg-[#F1F1F1] z-20">
                            <SelectItem value="new-york">New York</SelectItem>
                            <SelectItem value="los-angeles">
                                Los Angeles
                            </SelectItem>
                            <SelectItem value="chicago">Chicago</SelectItem>
                            <SelectItem value="houston">Houston</SelectItem>
                            <SelectItem value="phoenix">Phoenix</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={handleContinue}
                    className="w-full bg-[#293991] text-white py-6"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
