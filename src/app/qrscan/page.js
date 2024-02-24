"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Navbar from '../component/navbar';

const QRScanPage = () => {
    const qrRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [scannedCoordinates, setScannedCoordinates] = useState(null);

    // School coordinates
    const targetLatitude = 49.20026397705078;
    const targetLongitude = -0.35017213225364685;

    const getGeolocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    const isWithinRadius = (latitude1, longitude1, latitude2, longitude2, radius) => {
        const earthRadiusInMeters = 6371e3;
        const latitude1InRadians = (latitude1 * Math.PI) / 180;
        const latitude2InRadians = (latitude2 * Math.PI) / 180;
        const deltaLatitudeInRadians = ((latitude2 - latitude1) * Math.PI) / 180;
        const deltaLongitudeInRadians = ((longitude2 - longitude1) * Math.PI) / 180;

        const a = Math.sin(deltaLatitudeInRadians / 2) * Math.sin(deltaLatitudeInRadians / 2) +
            Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) * Math.sin(deltaLongitudeInRadians / 2) * Math.sin(deltaLongitudeInRadians / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = earthRadiusInMeters * c; // in meters
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

                const onScanSuccess = (decodedText, decodedResult) => {
                    console.log(`Code scanned = ${decodedText}`, decodedResult);

                    // if the decoded text is a URL, redirect to it
                    if (isValidURL(decodedText)) {
                        window.location.href = decodedText;
                    }
                };

                const onScanFailure = (error) => {
                    console.log(`QR code scan error = ${error}`);
                };

                html5QrCode.render(onScanSuccess, onScanFailure);
            })
            .catch(error => {
                console.log(`Geolocation error = ${error}`);
            });

        function isValidURL(string) {
            const res = string.match(/(https?:\/\/[^\s]+)/g);
            return (res !== null)
        }
    }, []);

    const withinRadius = latitude && longitude
        ? isWithinRadius(
            latitude,
            longitude,
            targetLatitude,
            targetLongitude,
            200
        )
        : false;

    return (
        <div>
            <Navbar />
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
        </div>
    );
};

export default QRScanPage;
