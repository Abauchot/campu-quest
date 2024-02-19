"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
    const qrRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [withinRadius, setWithinRadius] = useState(false);

    const getDistanceFromLatLonInM = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d * 1000; // Distance in m
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    useEffect(() => {
        const checkGeolocation = async () => {
            try {
                const position = await getGeolocation();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                const distance = getDistanceFromLatLonInM(position.coords.latitude, position.coords.longitude, 49.20065, -0.35028);
                if (distance <= 50) {
                    setWithinRadius(true);
                    alert('Your custom success message here');
                } else {
                    setWithinRadius(false);
                }
            } catch (error) {
                console.log(`Error getting geolocation: ${error}`);
            }
        };
    
        const html5QrCode = new Html5QrcodeScanner(
            "qr-reader",
            { fps: 10, qrbox: 250 },
            /* verbose= */ false
        );
        const onScanSuccess = async (decodedText, decodedResult) => {
            console.log(`Code scanned = ${decodedText}`, decodedResult);
            await checkGeolocation();
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
            {withinRadius ? <p>Within 50 meter radius</p> : <p>Outside 50 meter radius</p>}
        </div>
    );
};

export default QRScanPage;