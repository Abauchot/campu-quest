"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Navbar from '../component/navbar';

const QRScanPage = () => {
    const qrRef = useRef(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [scannedCoordinates, setScannedCoordinates] = useState(null);
    const [serialQuest, setSerialQuest] = useState(null);
    const [isMatch, setIsMatch] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    


    // School coordinates
    const targetLatitude = 49.20026397705078;
    const targetLongitude = -0.35017213225364685;

    const getGeolocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject(new Error('Geolocation is not supported by this browser or smartphone.'));
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

                const onScanSuccess = async (decodedText, decodedResult) => {
                    console.log(`Code scanned = ${decodedText}`, decodedResult);
                    
                    try {
                        const response = await fetch(`/api/quests/getSerialQuest?serialQuest=${decodedText.toLowerCase()}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                
                        const data = await response.json();
                
                        if (response.ok) { // Utilisez response.ok pour vérifier que le code de statut HTTP est 2xx
                            // QR code valide et trouvé
                            console.log('Success! The scanned QR code matches a SerialQuest in the DB.');
                            setIsSuccess(true);
                            setErrorMessage(''); // Reset error message if successful
                        } else {
                            // QR code non trouvé ou autre erreur
                            console.log(data.message || 'QR code not found or an error occurred.');
                            setIsSuccess(false);
                            setErrorMessage(data.message || 'An unknown error occurred.');
                        }
                    } catch (error) {
                        console.error('Error verifying serialQuest:', error);
                        setIsSuccess(false);
                        setErrorMessage('An error occurred while verifying the QR code.');
                    }
                };
                

                const onScanFailure = (error) => {
                };

                html5QrCode.render(onScanSuccess);
            })
            .catch(error => {
                console.log(`Geolocation error = ${error}`);
            });
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
            <div className="flex flex-col  items-center justify-center min-h-screen p-4 bg-grey">
                <div id="qr-reader" ref={qrRef} className="w-full max-w-md"></div>
                {isSuccess && <p style={{color: 'green', fontSize:'25px'}}>Success! You just find a quest !</p>}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
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