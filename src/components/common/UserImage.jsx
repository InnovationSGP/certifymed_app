import Image from 'next/image';
import { useRef, useState } from 'react';

const UserImageProfile = ({ onChange }) => {
    const [previewImage, setPreviewImage] = useState('/images/user-1.png');
    const imageRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleImageClick = () => {
        imageRef.current.click();
    };

    return (
        <div className="user-profile">
            <h2>Profile Image</h2>
            <div
                className="w-[100px] relative aspect-square cursor-pointer"
                onClick={handleImageClick}
            >
                <Image
                    src={previewImage}
                    alt="Profile Preview"
                    className="rounded-full object-cover"
                    fill
                />
            </div>
            <input
                type="file"
                accept="image/*"
                ref={imageRef}
                onChange={handleImageChange}
                className="hidden"
            />
        </div>
    );
};

export default UserImageProfile;
