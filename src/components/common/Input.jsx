import * as React from 'react';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={`flex items-center w-full gap-3 px-3 overflow-hidden  bg-superSilver placeholder:!text-shadesOn placeholder:opacity-45 text-dimGray outline-primary rounded-xl font-medium h-[55px] xl:h-[60px] ${className}`}
            ref={ref}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export { Input };
