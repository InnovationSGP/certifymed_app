import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryBtn from '@/components/common/PrimaryBtn';
import { paymentSchema } from '@/utils/validationSchema';

export default function PayOutOfPocket({ addPayment }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue
    } = useForm({
        resolver: zodResolver(paymentSchema)
    });

    const onSubmit = (data) => {
        if (addPayment) {
            addPayment({ ...data, currency: 'Indian Rupee' });
        }
    };

    return (
        <div className="w-full md:w-11/12 text-black p-4 px-4 sm:px-6 bg-white rounded-xl shadow-tab mb-24">
            <p className="text-lg sm:text-xl font-poppins font-semibold text-secondary sm:mt-4">
                Payment Methods
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row w-full justify-start gap-3 mt-4">
                    {['Debit Card', 'Credit Card', 'Paypal'].map(
                        (item, index) => (
                            <button
                                key={index}
                                type="button" // Prevent form submission
                                onClick={() => {
                                    setValue('paymentMethod', item); // Update form value
                                }}
                                className={`border min-w-36 text-sm rounded-lg h-[55px] xl:h-[60px] hover:bg-primary hover:text-white transition-all duration-200 ease-in-out flex items-center justify-center ${
                                    watch('paymentMethod') === item
                                        ? 'bg-primary text-white'
                                        : 'bg-white'
                                } cursor-pointer`}
                            >
                                <span className={`font-semibold`}>{item}</span>
                            </button>
                        )
                    )}
                </div>
                {errors.paymentMethod && (
                    <span className="text-red text-sm">
                        {errors.paymentMethod.message}
                    </span>
                )}

                <div className="flex flex-col my-6 mt-6 gap-4">
                    <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-12">
                        <div className="w-full">
                            <label className="font-medium text-dimGray">
                                First name
                            </label>
                            <input
                                {...register('firstName')}
                                className={`input-style ${
                                    errors.firstName ? 'error-border' : ''
                                }`}
                                type="text"
                                placeholder="Enter your name"
                            />
                            {errors.firstName && (
                                <span className="text-red text-sm">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>
                        <div className="w-full">
                            <label className="font-medium text-dimGray">
                                Last name
                            </label>
                            <input
                                {...register('lastName')}
                                type="text"
                                placeholder="Enter your last name"
                                className={`input-style ${
                                    errors.lastName ? 'error-border' : ''
                                }`}
                            />
                            {errors.lastName && (
                                <span className="text-red text-sm">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-12">
                        <div className="w-full">
                            <label className="font-medium text-dimGray">
                                Credit Card Number
                            </label>
                            <input
                                {...register('creditCardNumber')}
                                type="text"
                                placeholder="1234"
                                className={`input-style ${
                                    errors.creditCardNumber
                                        ? 'error-border'
                                        : ''
                                }`}
                            />
                            {errors.creditCardNumber && (
                                <span className="text-red text-sm">
                                    {errors.creditCardNumber.message}
                                </span>
                            )}
                        </div>
                        <div className="w-full flex justify-between gap-2 sm:gap-6">
                            <div className="w-full">
                                <label>CVV</label>
                                <input
                                    {...register('cvv')}
                                    type="text"
                                    placeholder="CVV"
                                    className={`input-style ${
                                        errors.cvv ? 'error-border' : ''
                                    }`}
                                />
                                {errors.cvv && (
                                    <span className="text-red text-sm">
                                        {errors.cvv.message}
                                    </span>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="font-medium text-dimGray">
                                    MM
                                </label>
                                <input
                                    {...register('mm')}
                                    type="text"
                                    placeholder="MM"
                                    className={`input-style ${
                                        errors.mm ? 'error-border' : ''
                                    }`}
                                />
                                {errors.mm && (
                                    <span className="text-red text-sm">
                                        {errors.mm.message}
                                    </span>
                                )}
                            </div>
                            <div className="w-full">
                                <label className="font-medium text-dimGray">
                                    YYYY
                                </label>
                                <input
                                    {...register('yyyy')}
                                    type="text"
                                    placeholder="YYYY"
                                    className={`input-style ${
                                        errors.yyyy ? 'error-border' : ''
                                    }`}
                                />
                                {errors.yyyy && (
                                    <span className="text-red text-sm">
                                        {errors.yyyy.message}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <PrimaryBtn
                    type="submit"
                    className="text-center bg-primary !h-[55px] md:!h-[60px] w-full md:w-min md:px-40"
                >
                    Submit
                </PrimaryBtn>
            </form>
        </div>
    );
}
