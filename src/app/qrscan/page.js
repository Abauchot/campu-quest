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
        getGeolocation().then(position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
    
            const html5QrCode = new Html5QrcodeScanner(
                "qr-reader",
                { fps: 10, qrbox: 250 },
                /* verbose= */ false
            );
            const onScanSuccess = async (decodedText, decodedResult) => {
                console.log(`Code scanned = ${decodedText}`, decodedResult);
                // Geolocation is already obtained here
            };
            html5QrCode.render(onScanSuccess, error => {
                console.log(`QR code scan error = ${error}`);
            });
        }).catch(error => {
            console.log(`Geolocation error = ${error}`);
        });
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