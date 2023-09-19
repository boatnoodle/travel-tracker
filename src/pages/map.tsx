import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  InfoBox,
  InfoWindow,
  InfoWindowF,
  LoadScript,
  Marker,
  MarkerF,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { CreateReviewModal } from "@/components/CreateReviewModal";
import { Layout } from "@/components/Layout";
import RestaurantCard from "@/components/ResturantCard";
import dynamic from "next/dynamic";

/* --------------------------------- Styles --------------------------------- */

const containerStyle = {
  width: "100%",
  height: "100vh",
};

/* ------------------------------- Interfaces ------------------------------- */
const mockPlaces = [
  {
    location_id: "4090348",
    name: "Cafe' by Navy Wives Association",
    lat: 13.720079240212836,
    lng: 100.38313747882236,
  },
  {
    location_id: "4090348",
    name: "Cafe' by Navy Wives Association",
    lat: 13.717722405250667,
    lng: 100.38350025900671,
  },
  {
    location_id: "4090348",
    name: "Cafe' by Navy Wives Association",
    lat: 13.71232656240719,
    lng: 100.4520912394102,
  },
];

function Page() {
  const { data: session } = useSession();

  const [marker, setMarker] = useState<{ lat: number; lng: number }>();
  const [coords, setCoords] = useState<{ lat: number; lng: number }>();
  const [bounds, setBounds] = useState({});
  // const [places, setPlaces] = useState<
  //   { latitude: number; longitude: number }[]
  // >(mockPlaces as any);

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const onAutocompleteLoad = (autoC: google.maps.places.Autocomplete) =>
    setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const autoC = autocomplete;
    if (!autoC) return;
    const geometry = autoC.getPlace().geometry;
    if (!geometry) return;
    const location = geometry.location;
    if (!location) return;

    const lat = location.lat();
    const lng = location.lng();

    setCoords({ lat, lng });
  };

  const onClickMap = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() as number;
    const lng = e.latLng?.lng() as number;
    setMarker({ lat, lng });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log(latitude, longitude);
        setCoords({ lat: latitude, lng: longitude });
      },
    );
  }, []);

  return (
    // <Layout>
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyDNc3leOhd15yiV8tkx28h-uTaYq-dbpGo"
      libraries={["places"]}
    >
      <CreateReviewModal isOpen={false} />
      <Autocomplete onLoad={onAutocompleteLoad} onPlaceChanged={onPlaceChanged}>
        <div>
          <input className="" placeholder="Search…" />
        </div>
      </Autocomplete>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords}
        zoom={16}
        onClick={onClickMap}
      >
        {marker && marker.lat && marker.lng && (
          <MarkerF position={{ lat: marker.lat, lng: marker.lng }}>
            <InfoWindowF position={{ lat: marker.lat, lng: marker.lng }}>
              <button>Create Review</button>
            </InfoWindowF>
          </MarkerF>
        )}
        {mockPlaces.map((each, i) => {
          return (
            <InfoWindowF
              key={i}
              position={{
                lat: each.lat,
                lng: each.lng,
              }}
            >
              <RestaurantCard />
            </InfoWindowF>
          );
        })}
      </GoogleMap>
    </LoadScript>
    // </Layout>
  );
}

export default React.memo(Page);