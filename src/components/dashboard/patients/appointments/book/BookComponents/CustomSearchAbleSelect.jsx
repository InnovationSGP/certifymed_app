import { TabDownArrowIcon } from '@/components/common/AppIcons';
import { useState, useRef, useEffect } from 'react';

const CustomSearchableSelect = ({ setCity, city }) => {
    const [inputValue, setInputValue] = useState(city || ''); // Input value for searching
    const [isOpen, setIsOpen] = useState(false); // Dropdown visibility
    const [highlightIndex, setHighlightIndex] = useState(-1); // Keyboard navigation index
    const dropdownRef = useRef(null); // Ref for dropdown

    const cities = [
        { value: 'new-york', label: 'New York' },
        { value: 'los-angeles', label: 'Los Angeles' },
        { value: 'chicago', label: 'Chicago' },
        { value: 'houston', label: 'Houston' },
        { value: 'phoenix', label: 'Phoenix' }
    ];

    // Filter cities based on input
    const filteredCities = cities.filter((c) =>
        c.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Handle selection
    const handleSelect = (selectedCity) => {
        setCity(selectedCity.label);
        setInputValue(selectedCity.label);
        setIsOpen(false);
    };

    // Keyboard navigation
    const handleKeyDown = (event) => {
        if (!isOpen) return;

        if (event.key === 'ArrowDown') {
            setHighlightIndex((prev) =>
                prev < filteredCities.length - 1 ? prev + 1 : 0
            );
        } else if (event.key === 'ArrowUp') {
            setHighlightIndex((prev) =>
                prev > 0 ? prev - 1 : filteredCities.length - 1
            );
        } else if (event.key === 'Enter' && highlightIndex >= 0) {
            handleSelect(filteredCities[highlightIndex]);
        } else if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="flex h-[55px] md:h-[60px] w-full items-center bg-[#F1F1F1] cursor-pointer 
                outline-none border-transparent justify-between whitespace-nowrap rounded-[12px] px-3 sm:px-4 py-2 text-base text-[#B5B5B5] font-medium font-poppins"
            >
                <input
                    type="text"
                    className="bg-transparent outline-none h-full w-full"
                    placeholder="Select"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                <TabDownArrowIcon />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute w-full mt-1 bg-[#F1F1F1] z-[100] cursor-pointer overflow-hidden rounded-xl">
                    {filteredCities.length > 0 ? (
                        filteredCities.map((c, index) => (
                            <div
                                key={c.value}
                                className={`py-1 sm:py-2 px-3 sm:px-4 cursor-pointer ${
                                    highlightIndex === index
                                        ? 'bg-primary text-white'
                                        : 'hover:bg-gray-100'
                                }`}
                                onClick={() => handleSelect(c)}
                                onMouseEnter={() => setHighlightIndex(index)}
                            >
                                {c.label}
                            </div>
                        ))
                    ) : (
                        <div className="py-1 sm:py-2 px-3 sm:px-4 text-black text-base">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomSearchableSelect;
