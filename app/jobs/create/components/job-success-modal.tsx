"use client";

import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/custom/heading";
import { Paragraph } from "@/components/custom/paragraph";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  iconSrc?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title = "Success",
  message,
  buttonText = "Done",
  iconSrc = "/svg/success-icon.svg",
}) => {
  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[90vw] max-w-[400px] [&>button]:hidden rounded-xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4">
          {/* Success Icon - Responsive Size */}
          <div className="flex items-center justify-center mb-4 sm:mb-6">
           <Image
              src={iconSrc}
              alt="Success"
              width={100}
              height={100}
              className="w-46 h-46 sm:w-24 sm:h-24 object-contain"
              priority
            />
          </div>

          {/* Success Message */}
          <Heading size="xs" className="text-center mb-2 px-2">
          {title}
          </Heading>

          {/* Optional Message */}
          {message && (
            <Paragraph size="lg" className="text-center text-gray-600 mb-4 sm:mb-6 px-2">
             {message}
            </Paragraph>
          )}

          {/* Action Button */}
          <div className="w-full mt-2 sm:mt-4">
            <Button
              onClick={onClose}
              className="w-full bg-[#F4781B] hover:bg-orange-600 text-white font-medium py-5 sm:py-6 rounded-lg text-sm sm:text-base"
           >
              {buttonText}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
