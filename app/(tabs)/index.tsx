import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import Mapbox, { Camera, LocationPuck, MapView, ShapeSource, SymbolLayer,Images, CircleLayer } from '@rnmapbox/maps';
// import * as Location from 'expo-location';
import { featureCollection, point } from '@turf/helpers'
import pin from '../../assets/pin.png';
import scooters from '~/data/scooters.json'
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_KEY || '');

const App = () => {
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       Alert.alert('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     console.log(location);
  //   })();
  // }, []);
  const points = scooters.map(scooter => point([scooter.long, scooter.lat]))

  return (
    <MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/dark-v11'>
      <Camera followZoomLevel={14} followUserLocation />
      <LocationPuck puckBearingEnabled puckBearing='heading' pulsing={{isEnabled: true}} />

      <ShapeSource 
        id="scooter" 
        cluster 
        shape={featureCollection(points)} 
        onPress={(e) => console.log(JSON.stringify(e, null, 2))}>

        <SymbolLayer 
          id="clusters-count"
          style={{
            textField:['get','point_count'],
            textSize:18,
            textColor: '#ffffff',
            textPitchAlignment: 'map'
          }}
        />

        <CircleLayer 
          id="clusters"
          filter={['has','point_count']}
          style={{
            circlePitchAlignment: 'map',
            circleColor:'#42E100',
            circleRadius: 20,
            circleOpacity:1,
            circleStrokeWidth:2,
            circleStrokeColor:'white'
          }}
        />

        <SymbolLayer 
        id="scooter-icons"
        filter={['!',['has','point_count']]} 
        style={{
          iconImage: 'pin',
          iconSize: 0.5,
          iconAllowOverlap: false,
          iconAnchor: 'bottom'
        }} />
        <Images images={{ pin }} />
      </ShapeSource>
    </MapView>
  );
};

export default App;
