import HorizontalDatePicker from '../ui/Horizontal-Date-Picker';

const Choose_Date_Time = ({ tabNumber, setTabNumber }) => {
    const insuranceProviders = [
        {
            shift: 'Morning',
            data: [
                { time: '8:30 am', count: 4 },
                { time: '9:30 am', count: 2 },
                { time: '10:30 am', count: 1 },
                { time: '11:30 am', count: 5 },
                { time: '12:00 pm', count: 8 }
            ]
        },
        {
            shift: 'Afternoon',
            data: [
                { time: '12:30 pm', count: 2 },
                { time: '01:30 pm', count: 3 },
                { time: '02:30 pm', count: 5 },
                { time: '03:30 pm', count: 1 },
                { time: '04:30 pm', count: 6 }
            ]
        },
        {
            shift: 'Evening',
            data: [
                { time: '06:30 pm', count: 2 },
                { time: '07:30 pm', count: 4 },
                { time: '08:30 pm', count: 5 },
                { time: '09:30 pm', count: 9 },
                { time: '10:30 pm', count: 4 },
                { time: '11:30 pm', count: '1' }
            ]
        }
    ];

    return (
        <div className="w-11/12 mb-24">
            <HorizontalDatePicker />
            <div className="gap-4 p-7 my-10 rounded-xl bg-white shadow-lg">
                {insuranceProviders.map((provider, index) => (
                    <div key={index} className="flex flex-col py-2">
                        <p className="font-medium text-2xl">{provider.shift}</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 py-3">
                            {provider.data.map((items, indexs) => (
                                <button
                                    onClick={() => {
                                        setTabNumber(tabNumber + 1),
                                            sessionStorage.setItem(
                                                'timing',
                                                items.time
                                            );
                                    }}
                                    key={indexs}
                                    className="border rounded-lg p-4 flex items-center justify-between w-full text-[#4864FF] border-[#4864FF] cursor-pointer"
                                >
                                    <span
                                        className={`text-${
                                            items.count / 2 == 0
                                                ? 'purple'
                                                : 'blue'
                                        }-600 font-semibold`}
                                    >
                                        {items.time}
                                    </span>
                                    <span className="p-1 px-3 shadow-md items-center rounded-full border">
                                        {items.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Choose_Date_Time;
