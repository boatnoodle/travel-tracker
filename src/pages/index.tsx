import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { AllReviewDialog } from "@/components/AllReviewDialog";
import { CreatePlaceDialog } from "@/components/CreatePlaceDialog";
import { CreateReviewDialog } from "@/components/CreateReviewDialog";
import { PlacePin } from "@/components/PlacePin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Place } from "@/server/api/root";
import { api } from "@/utils/api";
import {
  Autocomplete,
  GoogleMap,
  InfoWindowF,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import Image from "next/image";
import { MyReviewDialog } from "@/components/MyReviewDialog";

/* --------------------------------- Styles --------------------------------- */

const containerStyle = {
  width: "100%",
  height: "100vh",
};

/* ------------------------------- Interfaces ------------------------------- */
export type location = { lat: number; lng: number };

export default function Home() {
  const { data: session, status } = useSession();
  const [marker, setMarker] = useState<location>();
  const [coords, setCoords] = useState<location>();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [openMyReviewDialog, setOpenMyReviewDialog] = useState(false);
  const [openPlaceDialog, setOpenPlaceDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const [openAllReviewDialog, setOpenAllReviewDialog] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Place>(null);
  const {
    data: places,
    isLoading: placeLoading,
    refetch: refetchPlace,
  } = api.place.getAll.useQuery();

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const onAutocompleteLoad = (autoC: google.maps.places.Autocomplete) => {
    setAutocomplete(autoC);
  };

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
    map.setZoom(16);
  };

  const onClickMap = (e: google.maps.MapMouseEvent) => {
    const lat = e.latLng?.lat() as number;
    const lng = e.latLng?.lng() as number;
    setMarker({ lat, lng });
  };

  const onPlaceCreated = () => {
    setOpenPlaceDialog(!openPlaceDialog);
    refetchPlace();
  };

  const onSelectPlace = (place: Place) => {
    setSelectedPlace(place);
    setOpenReviewDialog(!openReviewDialog);
  };

  const onReviewCreated = () => {
    setOpenReviewDialog(!openReviewDialog);
    refetchPlace();
  };

  useEffect(() => {
    setCoords({ lat: 15.455884848411362, lng: 101.02946470932473 });
    // if (!navigator.geolocation) {
    //   console.error("Geolocation is not supported by your browser");
    //   setCoords({ lat: 15.455884848411362, lng: 101.02946470932473 });
    // } else {
    //   navigator.geolocation.getCurrentPosition(
    //     ({ coords: { latitude, longitude } }) => {
    //       setCoords({ lat: latitude, lng: longitude });
    //     },
    //     (error) => {
    //       console.error(error);
    //     },
    //   );
    // }
  }, []);

  if (status !== "loading" && !session) signIn();

  return (
    <>
      <Head>
        <title>Travel Tracker</title>
        <meta name="description" content="Generated by NatPrae" />
        <link rel="icon" href="/globe-favicon.ico" />
      </Head>

      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDNc3leOhd15yiV8tkx28h-uTaYq-dbpGo"
        libraries={["places"]}
      >
        {/* Search bar */}
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <div className="fixed inset-x-0 top-0 z-50 p-5">
            <Input
              className="px-4 py-3 text-base tracking-wide shadow-lg"
              placeholder="ค้นหาสถานที่…"
            />
          </div>
        </Autocomplete>

        {/* Google map */}
        <GoogleMap
          options={{
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            gestureHandling: "greedy",
            disableDoubleClickZoom: true,
            clickableIcons: false,
          }}
          mapContainerStyle={containerStyle}
          center={coords}
          zoom={6}
          onClick={onClickMap}
          onLoad={setMap}
        >
          {marker && marker.lat && marker.lng && (
            <MarkerF position={{ lat: marker.lat, lng: marker.lng }}>
              <InfoWindowF
                position={{ lat: marker.lat, lng: marker.lng }}
                options={{
                  disableAutoPan: true,
                }}
              >
                <Button
                  className="bg-gradient-to-tr from-blue-800 to-emerald-500 tracking-wide"
                  onClick={() => setOpenPlaceDialog(!openPlaceDialog)}
                >
                  สร้างสถานที่
                </Button>
              </InfoWindowF>
            </MarkerF>
          )}

          {places?.map((place, i) => {
            return (
              <InfoWindowF
                key={i}
                position={{
                  lat: place.lat,
                  lng: place.lng,
                }}
              >
                <PlacePin
                  onSelectPreviewReview={() => {
                    setOpenAllReviewDialog(!openAllReviewDialog);
                    setSelectedPlace(place);
                  }}
                  onSelectCreateReview={onSelectPlace}
                  placeData={place}
                />
              </InfoWindowF>
            );
          })}
        </GoogleMap>

        {/* Create place dialog */}
        <CreatePlaceDialog
          open={openPlaceDialog}
          onOpenChange={(value) => setOpenPlaceDialog(value)}
          location={marker}
          onCreated={onPlaceCreated}
        />

        {/* Create review dialog */}
        {selectedPlace && (
          <CreateReviewDialog
            placeData={selectedPlace}
            open={openReviewDialog}
            onOpenChange={(value) => {
              setSelectedPlace(null);
              setOpenReviewDialog(value);
            }}
            onCreated={onReviewCreated}
          />
        )}

        {/* Review dialog */}
        {openAllReviewDialog && selectedPlace && (
          <AllReviewDialog
            place={selectedPlace}
            open={openAllReviewDialog}
            onOpenChange={(value) => {
              setSelectedPlace(null);
              setOpenAllReviewDialog(value);
            }}
          />
        )}

        <MyReviewDialog
          open={openMyReviewDialog}
          onOpenChange={(value) => {
            setOpenMyReviewDialog(value);
          }}
        />
      </LoadScript>
      <div className="fixed bottom-0 right-0 flex flex-col gap-4 px-3 py-5">
        <div className="flex justify-center">
          <Image
            src={session?.user?.image}
            width={40}
            height={40}
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="flex">
          <Button
            variant="default"
            onClick={() => {
              setOpenMyReviewDialog(true);
            }}
          >
            โปรไฟล์
          </Button>
        </div>
        <div className="flex">
          <Button variant="outline" onClick={() => window.location.reload()}>
            รีเฟรช
          </Button>
        </div>
      </div>
    </>
  );
}
