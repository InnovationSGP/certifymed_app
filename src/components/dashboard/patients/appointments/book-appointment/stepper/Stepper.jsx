const Stepper = ({ currentStep, onStepClick }) => {
    const steps = [1, 2, 3, 4, 5];

    return (
        <div className="flex w-full justify-center items-center">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <button
                        className={`w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer text-bluetitmouse shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] text-sm font-bold
                            ${
                                currentStep >= step
                                    ? 'border-[1px] border-[#4864FF] bg-[#ffff]'
                                    : 'bg-[#ffff]'
                            }`}
                        onClick={() => {
                            if (step < currentStep) {
                                onStepClick(step);
                            }
                        }}
                    >
                        <span className="font-poppins font-medium text-[14px] leading-[24px] tracking-[-0.02em]">
                            {step}
                        </span>
                    </button>
                    {index !== steps.length - 1 && (
                        <div
                            className={`max-w-[156px] w-[10vw] h-[2px] ${
                                currentStep > step
                                    ? 'bg-bluetitmouse'
                                    : 'bg-gray-300'
                            } mx-2`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
