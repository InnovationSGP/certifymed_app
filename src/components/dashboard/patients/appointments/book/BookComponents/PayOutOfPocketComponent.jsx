import { Input } from "@/components/common/Input";

export default function PayOutOfPocket({setPocketPayDetails, pocketPayDetails, handleContinue}) {
    return (
        <div className="w-11/12  text-black p-4 px-6 bg-white rounded-xl shadow-md mb-24">
            <p className="text-2xl font-medium mt-4">Payment Methods</p>
            <div className="flex flex-col md:flex-row w-full justify-start gap-3 mt-4">
                {['Debit Card', 'Credit Card', 'Paypal'].map((item, index) => (
                    <button
                        key={index}
                        onClick={(e) => {
                            setPocketPayDetails((prevDetails) => ({
                                ...prevDetails,
                                type: item
                            }));
                        }}
                        className={`border min-w-36 text-sm rounded-lg p-1 flex items-center justify-center ${
                            pocketPayDetails.type === item
                                ? 'bg-[#293991] text-white'
                                : 'bg-white'
                        } cursor-pointer`}
                    >
                        <span className={`font-semibold`}>{item}</span>
                    </button>
                ))}
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
                                className="h-[60px] input-style rounded-[12px] bg-[#F1F1F1]"
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
