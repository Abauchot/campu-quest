"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanPage = () => {
    const qrRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [scannedCoordinates, setScannedCoordinates] = useState(null);

    const getGeolocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    const isWithinRadius = (lat1, lon1, lat2, lon2, radius) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // in meters
        return distance <= radius;
    };

    useEffect(() => {
        getGeolocation()
            .then(position => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);

                const html5QrCode = new Html5QrcodeScanner(
                    "qr-reader",
                    { fps: 10, qrbox: 250 },
                    /* verbose= */ false
                );

                const onScanSuccess = async (decodedText, decodedResult) => {
                    console.log(`Code scanned = ${decodedText}`, decodedResult);
                    setScannedCoordinates({
                        latitude: decodedResult?.location?.latitude,
                        longitude: decodedResult?.location?.longitude,
                    });
                };

                html5QrCode.render(onScanSuccess, error => {
                    console.log(`QR code scan error = ${error}`);
                });
            })
            .catch(error => {
                console.log(`Geolocation error = ${error}`);
            });
    }, []);

    const withinRadius = scannedCoordinates
        ? isWithinRadius(
              latitude,
              longitude,
              scannedCoordinates.latitude,
              scannedCoordinates.longitude,
              200
          )
        : false;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
            <div id="qr-reader" ref={qrRef} className="w-full max-w-md"></div>
            {latitude && longitude && (
                <p>
                    Your current coordinates: Latitude: {latitude}, Longitude: {longitude}
                </p>
            )}
            {scannedCoordinates && (
                <p>
                    Scanned coordinates: Latitude: {scannedCoordinates.latitude}, Longitude:{' '}
                    {scannedCoordinates.longitude}
                </p>
            )}
            {withinRadius && (
                <p style={{ color: 'green' }}>Scanned coordinates are within 200 meters radius!</p>
            )}
            {!withinRadius && (
                <p style={{ color: 'red' }}>Scanned coordinates are NOT within 200 meters radius!</p>
            )}
        </div>
    );
};

export default QRScanPage;
