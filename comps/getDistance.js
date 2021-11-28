import React, { useEffect, useState, useRef, useContext } from "react";
import { LocationContext } from "../comps/location";
import Geocode from "react-geocode";
import axios from "axios";

export default function getDistance(address) {

  const { currentAddress, curLng, curLat } = useContext(LocationContext);

  const [lng, setLong] = useState(null);
  const [lat, setLat] = useState(null);

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // Get latitude & longitude from address.
  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLong(lng);
      setLat(lat);
    },
    (error) => {
      console.error(error);
    }
  );

  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${curLat}%2C${curLng}&destinations=${lat}%2C${lng}&key=AIzaSyBKDzfaPIYxv1yBdca_ldICCqRT_zTUqZY`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.rows[0].elements[0].distance.text);

      const distance = response.data.rows[0].elements[0].distance.text;

      return distance
    })
    .catch(function (error) {
      console.log(error);
    });

}
