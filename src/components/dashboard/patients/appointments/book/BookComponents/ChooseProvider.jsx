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
import PrimaryBtn from '@/components/common/PrimaryBtn';
import CustomSearchAbleSelect from './CustomSearchAbleSelect';

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
            setMainText('Please Select a provider');
        }
    };

    return (
        <div className="w-full max-w-[593px] mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-lg mb-24">
            {/* Avatar group */}
            <div className="flex justify-center -space-x-4 mb-6">
                {providers.map((provider, index) => (
                    <Avatar
                        key={index}
                        className="w-10 h-10 border border-primary"
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
                    <p className="text-base font-poppins text-dimGray font-medium  mb-1 pl-1">
                        City
                    </p>
                    <CustomSearchAbleSelect setCity={setCity} city={city} />
                </div>
                <PrimaryBtn
                    onClick={handleContinue}
                    className={'w-full !h-[55px] md:!h-[60px]'}
                >
                    Continue
                </PrimaryBtn>
            </div>
        </div>
    );
}
