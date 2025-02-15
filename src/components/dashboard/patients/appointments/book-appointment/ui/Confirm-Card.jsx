'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/dashboard/patients/appointments/book-appointment/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/dashboard/patients/appointments/book-appointment/ui/Dialog';
import Image from 'next/image';

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
            <DialogContent className="max-w-3xl  bg-white">
                <DialogHeader>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 h-6 w-6 rounded-full"
                        onClick={() => {
                            setIsShowConfirmCard(false);
                        }}
                    ></Button>
                </DialogHeader>
                <div className="flex flex-col items-center text-center">
                    <div className="relative h-96 w-96">
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
                    <Button
                        onClick={() => {
                            setIsBookAppointment(false);
                        }}
                        className="mt-8 py-6 w-full rounded-xl max-w-xs bg-[#293991] text-white hover:bg-[#25358f]"
                    >
                        <span>Back to Homepage</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
