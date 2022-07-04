import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import geoJson from "../helpers/locations.json";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic2hpZnR3YWxrIiwiYSI6ImNsNTZzZzdtcjA5MmkzY25zNTdsZm1xcGQifQ.n_kliIExnDX-rVYROd-qog";

const Map = () => {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/shiftwalk/cl56sqsa300cj14og2a4vsrfi",
      center: [-122.664238, 45.513533],
      zoom: 14,
    });

    // Create default markers
    geoJson.features.map((feature) => {
      const el = document.createElement('div');
      const width = 65;
      const height = 65;
      el.className = 'marker';
      el.style.backgroundImage = `url(/images/marker.svg)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = '100%';
      
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(map)
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="absolute inset-0 w-full h-full object-cover" ref={mapContainerRef} />;
};

export default Map;