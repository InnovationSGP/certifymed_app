const Stepper = ({ currentStep, onStepClick }) => {
    const steps = [1, 2, 3, 4, 5];

    return (
        <div className="flex w-full justify-center items-center pt-2">
            {steps.map((step, index) => (
                <div key={step} className="flex items-center">
                    <button
                        className={`w-[30px] h-[30px] flex items-center justify-center rounded-full cursor-pointer text-bluetitmouse text-sm font-bold
                            ${
                                currentStep > step
                                    ? 'bg-bluetitmouse text-white' // Completed step
                                    : currentStep === step
                                    ? 'border-[1px] border-bluetitmouse bg-[#ffff]' // Current step
                                    : 'bg-[#ffff] shadow-steps' // Upcoming step
                            }`}
                        onClick={() => {
                            if (step < currentStep) {
                                onStepClick(step);
                            }
                        }}
                    >
                        <span className="font-poppins font-medium text-[14px] leading-[24px] tracking-[-0.02em]">
                            0{step}
                        </span>
                    </button>
                    {index !== steps.length - 1 && (
                        <div
                            className={`max-w-[156px] w-[10vw] h-[2px] opacity-[0.5] ${
                                currentStep > step
                                    ? 'bg-bluetitmouse ' // Completed line
                                    : 'bg-gray-300' // Upcoming line
                            } mx-2`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
