"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
    const qrRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const getGeolocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    useEffect(() => {
        const html5QrCode = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: 250 },
            /* verbose= */ false
        );
        const onScanSuccess = async (decodedText, decodedResult) => {
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            // Get geolocation
            try {
                const position = await getGeolocation();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            } catch (error) {
                console.log(`Error getting geolocation: ${error}`);
            }
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
            {latitude && longitude && (
                <p>Latitude: {latitude}, Longitude: {longitude}</p>
            )}
        </div>
    );
};

export default QRScanPage;