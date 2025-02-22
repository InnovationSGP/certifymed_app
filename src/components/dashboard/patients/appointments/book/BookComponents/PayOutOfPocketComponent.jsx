import { Input } from '@/components/common/Input';
import PrimaryBtn from '@/components/common/PrimaryBtn';

export default function PayOutOfPocket({
    setPocketPayDetails,
    pocketPayDetails,
    handleContinue
}) {
    return (
        <div className="w-full md:w-11/12  text-black p-4 px-4 sm:px-6 bg-white rounded-xl shadow-tab mb-24">
            <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary sm:mt-4">
                Payment Methods
            </p>
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
                        className={`border min-w-36 text-sm rounded-lg p-1 hover:bg-primary hover:text-white transition-all duration-200 ease-in-out flex items-center justify-center ${
                            pocketPayDetails.type === item
                                ? 'bg-primary text-white'
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
                        <label className="font-medium text-dimGray">
                            First name
                        </label>
                        {/* <Input
                            value={pocketPayDetails.firstName}
                            placeholder="Enter your name"
                            className="input-style"
                            onChange={(e) => {
                                setPocketPayDetails((prevDetails) => ({
                                    ...prevDetails,
                                    firstName: e.target.value
                                }));
                            }}
                        /> */}
                        <input
                            name="name"
                            className={`input-style`}
                            type="text"
                            placeholder="Enter your name"
                            value={pocketPayDetails.firstName}
                            onChange={(e) => {
                                setPocketPayDetails((prevDetails) => ({
                                    ...prevDetails,
                                    firstName: e.target.value
                                }));
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <label className="font-medium text-dimGray">
                            Last name
                        </label>
                        <input
                            name="last name"
                            type="text"
                            value={pocketPayDetails.lastName}
                            onChange={(e) => {
                                setPocketPayDetails((prevDetails) => ({
                                    ...prevDetails,
                                    lastName: e.target.value
                                }));
                            }}
                            placeholder="Enter your last name"
                            className={`input-style`}
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-12">
                    <div className="w-full">
                        <label className="font-medium text-dimGray">
                            Credit Card Number
                        </label>
                        <input
                            name="card number"
                            value={pocketPayDetails.creditCardNumber}
                            type="number"
                            onChange={(e) => {
                                setPocketPayDetails((prevDetails) => ({
                                    ...prevDetails,
                                    creditCardNumber: e.target.value
                                }));
                            }}
                            placeholder="1234"
                            className={`input-style`}
                        />
                    </div>
                    <div className="w-full flex justify-between gap-2 sm:gap-6">
                        <div className="w-full">
                            <label>CVV</label>
                            <input
                                name="cvv"
                                value={pocketPayDetails.cvv}
                                type="number"
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        cvv: e.target.value
                                    }));
                                }}
                                placeholder="CVV"
                                className={`input-style`}
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-medium text-dimGray">
                                MM
                            </label>
                            <input
                                name="mm"
                                value={pocketPayDetails.mm}
                                type="number"
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        mm: e.target.value
                                    }));
                                }}
                                placeholder="MM"
                                className={`input-style`}
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-medium text-dimGray">
                                YYYY
                            </label>
                            <input
                                name="YYYY"
                                value={pocketPayDetails.yyyy}
                                type="number"
                                onChange={(e) => {
                                    setPocketPayDetails((prevDetails) => ({
                                        ...prevDetails,
                                        yyyy: e.target.value
                                    }));
                                }}
                                placeholder="YYYY"
                                className={`input-style`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <PrimaryBtn
                onClick={handleContinue}
                className="text-center bg-primary h-[52px] md:h-[60px] w-full md:w-min md:px-40"
            >
                Submit
            </PrimaryBtn>
        </div>
    );
}
