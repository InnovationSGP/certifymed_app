import { Input } from '@/components/dashboard/patients/appointments/book-appointment/ui/Input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/dashboard/patients/appointments/book-appointment/ui/select';
import { Button } from '@/components/dashboard/patients/appointments/book-appointment/ui/button';
import {
    Avatar,
    AvatarImage
} from '@/components/dashboard/patients/appointments/book-appointment/ui/avatar';
import { useState } from 'react';

export default function Choose_Provider({ tabNumber, setTabNumber }) {
    const [city, setCity] = useState();
    const providers = Array(8).fill(
        'https://addison.bold-themes.com/main-demo/wp-content/uploads/sites/3/2017/05/person-team-01.jpg'
    );

    const handleCountinue = () => {
        if (city) {
            setTabNumber(tabNumber + 1);
            sessionStorage.setItem('city', city);
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
                    <Select onValueChange={(value) => setCity(value)}>
                        <SelectTrigger className="w-full bg-[#F1F1F1] h-12">
                            <SelectValue placeholder="Select" />
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
                    onClick={handleCountinue}
                    className="w-full bg-[#293991] text-white py-6"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
