"use client";

import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
    const qrRef = useRef(null);

    useEffect(() => {
        const html5QrCode = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: 250 },
      /* verbose= */ false
        );
        const onScanSuccess = (decodedText, decodedResult) => {
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            // Handle the scanned text as needed.
            if (decodedText.startsWith('http://') || decodedText.startsWith('https://')) {
                // If the decoded text is a URL, navigate to it
                window.location.href = decodedText;
            } else {
                // Otherwise, handle the text as needed
                console.log(`QR code does not contain a URL: ${decodedText}`);
            }
        };
        html5QrCode.render(onScanSuccess, (errorMessage) => {
            console.log(errorMessage);
        });

        return () => {
            html5QrCode.clear();
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
            <div id="qr-reader" ref={qrRef} className="w-full max-w-md">
            </div>
        </div>
    );
};

export default QRScanPage;