import {
    ArrowLeft,
    BadgeCheck,
    Calendar,
    Cross,
    Heart,
    MessageCircle
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BioCardDoctor({ setIsBioShow }) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const profileData = {
        avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvcnRyYWl0JTIwbWFufGVufDB8fDB8fHww',
        userName: 'Bhupinder Singh FNK-BN',
        timings: sessionStorage.getItem('timing') || 'No Timings Available',
        appointmentType: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[0]
            : 'N/A',
        appointmentName: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[1]
            : 'N/A',
        appointmentDesc: sessionStorage.getItem('appointmentData')
            ? sessionStorage.getItem('appointmentData').split(',')[2]
            : 'N/A',
        selectedDate: sessionStorage.getItem('selectedDate'),
        appointmentDuration: 30,
        desc: 'Acute Care',
        exp: '13 years of experience',
        rating: 4.96,
        totalRating: 1758,
        moreDesc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores pariatur mollitia voluptas nesciunt? Non deleniti totam enim magnam pariatur officiis animi, quaerat, ea doloremque a placeat. Ratione, perferendis? Aut explicabo delectus quo officia molestias doloremque laboriosam, fugit consectetur rem voluptates velit ut facere minus non sit nemo. Blanditiis nesciunt modi pariatur, vero alias reiciendis numquam reprehenderit est commodi. Ipsa illo rerum eius aspernatur deleniti, veniam quas quisquam harum voluptatibus aliquid et ullam, dicta ad quaerat laudantium quam magnam corporis quae laborum nesciunt eaque, ducimus fuga? Quaerat ut blanditiis harum laborum animi tempora veritatis saepe quae qui, aut corporis tempore. Deleniti maxime, autem.'
    };

    return (
        <div className="opacity-100 overflow-auto right-0 xl:w-6/12 xl:h-min rounded-l-xl mb-24 p-6 bg-white border">
            <div className="flex flex-col w-full justify-center">
                <button
                    onClick={() => {
                        const newParams = new URLSearchParams(searchParams);
                        newParams.set('tab', 'final'.toString());
                        router.push(`?${newParams.toString()}`, {
                            scroll: false
                        });
                    }}
                >
                    <ArrowLeft size={15} />
                </button>
                <div className="flex flex-row justify-center gap-12">
                    <div className="overflow-hidden w-24 rounded-full bg-blue-300">
                        <img
                            src={profileData.avatar}
                            className="h-24 w-24 object-cover text-blue-700"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-4 mt-4">
                    <p className="font-medium text-xl">
                        {profileData.userName}
                    </p>
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        <p className="text-base flex items-center gap-1">
                            <Heart className="h-4 w-4 text-[#4864FF]" />
                            {profileData.desc}
                        </p>
                        <p className="text-base flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-[#4864FF]" />
                            {profileData.exp}
                        </p>
                        <p className="text-base flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-[#4864FF]" />
                            {profileData.rating}{' '}
                            <span className="text-gray-500">
                                ({profileData.totalRating})
                            </span>
                        </p>
                    </div>
                </div>
                <p className="mt-4">{profileData.moreDesc}</p>
                <button
                    onClick={() => setIsBioShow(false)}
                    className="flex items-center justify-center rounded-xl bg-[#4864FF29] text-[#4864FF] whitespace-nowrap p-4 px-8 mt-8 text-center"
                >
                    <button className="flex items-center justify-center gap-4">
                        <BadgeCheck />
                        Provider Selected
                    </button>
                </button>
            </div>
        </div>
    );
}
