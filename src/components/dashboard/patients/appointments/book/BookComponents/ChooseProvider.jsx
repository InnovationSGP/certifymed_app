'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/select';
import { Avatar, AvatarImage } from '@/components/common/avatar';
import { useState } from 'react';

export default function ChooseProvider() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [city, setCity] = useState();
    const [mainText, setMainText] = useState('Find a provider in your area');

    const providers = Array(8).fill(
        'https://s3-alpha-sig.figma.com/img/ef6a/fb79/316aa02d5b6e122cff0f2bd2bf3434cc?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=aA7b9aw4Dz1uf0oa0OrCIDVPEegkA4uQrmy6kLLTrFwLHw0PccfNORuNojBiwf6CADEK~OWXrG-Zi0BLS9bT-ipdHTdwfvXmy3RCmd5sY5mNAkRy~Wc8TvFR7I2KRe~uTmUQs3Ca-RYyG9dW29xsTobqyt8j-Vg97eQo9vmbbCiJZzDTNb-lQkpwKeyARwl4hZW~L~mdz6~75vE5BO-PWJ08sNP2nZ7tchyFfsxWGGjzWnpDJN9rPiugH2Xdth-i9acatpLvsCw~WJBzJzjwoSjPnLIpRr6PEAq3fZf2GLHhbyEzgB-1qZVUxgYuzA-JtoS~1Kjj~TZhCchUR32bLQ__'
    );

    const handleContinue = () => {
        if (city) {
            // Update URL to set the next tab and store city
            const newParams = new URLSearchParams(searchParams);
            newParams.set('tab', 'appointment'.toString());
            router.push(`?${newParams.toString()}`, { scroll: false });
        } else {
            setMainText("Please Select a provider")
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mb-24">
            {/* Avatar group */}
            <div className="flex justify-center -space-x-4 mb-6">
                {providers.map((provider, index) => (
                    <Avatar
                        key={index}
                        className="w-10 h-10 border border-[#293991]"
                    >
                        <AvatarImage
                            src={provider}
                            alt={`Provider ${index + 1}`}
                        />
                    </Avatar>
                ))}
            </div>

            <h2
                className={`text-2xl font-semibold text-center mb-2 ${
                    mainText === 'Find a provider in your area'
                        ? 'text-black'
                        : 'text-rose-500'
                }`}
            >
                {mainText}
            </h2>

            <h5 className="text-sm text-center">
                Enter your code and we will match you with board-certified
                providers licensed in your state.
            </h5>

            <div className="space-y-4 mt-4">
                <div className="my-4">
                    <p className="text-sm font-medium mb-1 pl-1">City</p>
                    <Select
                        onValueChange={(value) => {
                            setCity(value);
                        }}
                    >
                        <SelectTrigger className="w-full bg-[#F1F1F1] h-12">
                            <SelectValue
                                className="text-[#606060]"
                                placeholder={city || 'Select'}
                            />
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

                <button
                    onClick={handleContinue}
                    className="w-full h-[60px] rounded-[12px] bg-[#293991] text-white"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
