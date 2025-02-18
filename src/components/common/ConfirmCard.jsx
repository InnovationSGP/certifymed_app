'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/common/DialogBookComponent';
import Image from 'next/image';
import Link from 'next/link';

export default function BookingConfirmation({
    isOpen,
    setIsShowConfirmCard,
    setIsBookAppointment
}) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={() => {
                setIsShowConfirmCard(false);
            }}
        >
            <DialogContent className="border md:max-w-3xl bg-white">
                <DialogHeader>
                    <button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 h-6 w-6 rounded-full"
                        onClick={() => {
                            setIsShowConfirmCard(false);
                        }}
                    ></button>
                </DialogHeader>
                <div className="flex flex-col items-center text-center">
                    <div className="relative h-72 md:h-96 w-72 md:w-96">
                        <Image
                            src="/images/confirm-card.png"
                            alt="Booking confirmation illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                        Booking Confirmed!
                    </DialogTitle>
                    <p className="mt-4 text-muted-foreground">
                        Your appointment has been successfully booked.<br></br>
                        You will receive a confirmation email and SMS shortly.
                    </p>
                    <Link href={"/dashboard/patients/appointments/"}
                        className="mt-8 py-6 w-full rounded-xl max-w-xs bg-[#293991] text-white hover:bg-[#25358f]"
                    >
                        <span>Back to Homepage</span>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
