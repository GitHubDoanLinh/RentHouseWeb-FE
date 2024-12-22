import React, { useEffect } from "react";

const GoogleMap = ({ place }) => {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.defer = true;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: place }, (results, status) => {
        if (status === 'OK') {
          map.setCenter(results[0].geometry.location);
          new window.google.maps.Marker({ map, position: results[0].geometry.location });
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    };
  }, [place]);

  return <div id="map" style={{ width: "inherit", height: "inherit" }} />;
};

export default GoogleMap;
