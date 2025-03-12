import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback } from 'react'
import { useState } from 'react'

const containerStyle = {
    width: 'auto',
    height: '300px',
}

const center = {
    lat: 22.7196,
    lng: 75.8577,
}

const MyComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBKPgikL1GiBrhl8vqrp6n22pG_g6Mvc4w',
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback((map) => {
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)
        setMap(map)
    }, [])

    const onUnmount = useCallback((map) => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(MyComponent)