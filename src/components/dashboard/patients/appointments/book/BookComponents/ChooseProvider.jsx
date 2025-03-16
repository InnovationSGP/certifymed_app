'use client';
import { Avatar, AvatarImage } from '@/components/common/avatar';
import { Input } from '@/components/common/Input';
import PrimaryBtn from '@/components/common/PrimaryBtn';
import { setSearchDoctors } from '@/redux/slices/AppointmentSlice';
import { searchDoctor } from '@/services/AppointmentService';
import { debounce } from '@/utils/debounce';
import { Ban, CheckIcon, LoaderCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ChooseProvider() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const [city, setCity] = useState('');
    const [mainText, setMainText] = useState('Find a provider in your area');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', 'appointment'.toString());
    const providers = Array(8).fill('/images/profile2.webp');

    async function searchDoctorHandler() {
        if (!city) return;
        setLoading(true);
        setSuccess(false);
        setError(false);
        try {
            const data = await searchDoctor(city);
            if (data.count !== 0) {
                setSuccess(true);
                setError(false);
                dispatch(setSearchDoctors(data));
                router.push(`?${newParams.toString()}`, { scroll: false });
            } else {
                setSuccess(false);
                setError(true);
            }
        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    const debouncedSetCity = useRef(
        debounce((value) => {
            setCity(value);
        }, 50)
    ).current;

    return (
        <div className="w-full max-w-md p-6 mx-auto mb-24 bg-white shadow-lg rounded-2xl">
            {/* Avatar group */}
            <div className="flex justify-center mb-6 -space-x-4">
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

            <div className="mt-4 space-y-4">
                <div className="my-4">
                    <p className="pl-1 mb-1 text-base font-medium font-poppins text-dimGray">
                        City
                    </p>
                    <div className="w-full relative">
                        <Input
                            onFocus={() => {
                                setSuccess(false);
                                setError(false);
                            }}
                            type="text"
                            placeholder="Enter your city"
                            onKeyDown={(e) =>
                                e.key === 'Enter' && searchDoctorHandler(e)
                            }
                            className={`w-full h-[52px] md:h-[60px] disabled:cursor-not-allowed disabled:hover:bg-primary disabled:opacity-70 ${
                                success
                                    ? 'border-2 border-green-500'
                                    : error
                                    ? 'border-2 border-red'
                                    : ''
                            }`}
                            onChange={(e) => debouncedSetCity(e.target.value)}
                        />
                        {success && (
                            <CheckIcon
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
                                size={18}
                            />
                        )}
                        {error && (
                            <Ban
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red"
                                size={18}
                            />
                        )}
                    </div>
                </div>
                <PrimaryBtn
                    disabled={!city}
                    type="button"
                    onClick={searchDoctorHandler}
                    onKeyDown={(e) =>
                        e.key === 'Enter' && searchDoctorHandler()
                    }
                    className={
                        'w-full h-[52px] md:h-[60px] disabled:cursor-not-allowed disabled:hover:bg-primary disabled:opacity-70'
                    }
                >
                    {loading ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        'Continue'
                    )}
                </PrimaryBtn>
                {error && (
                    <span className="text-xs text-red">
                        No Doctor Found for this city
                    </span>
                )}
            </div>
        </div>
    );
}
