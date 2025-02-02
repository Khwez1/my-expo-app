import { ShapeSource, SymbolLayer, Images, CircleLayer } from "@rnmapbox/maps";
import { featureCollection, point } from '@turf/helpers'
import { OnPressEvent } from "@rnmapbox/maps/lib/typescript/src/types/OnPressEvent";
import { useScooter } from '~/providers/ScooterProvider';
import pin from '~/assets/pin.png';
import scooters from '~/data/scooters.json'

const ScooterMarkers = () => {
    const { setSelectedScooter } = useScooter();
    const points = scooters.map(scooter => point([scooter.long, scooter.lat], { scooter }))

    const onPointPress = async (event: OnPressEvent) => {
        if(event.features[0].properties?.scooter) {
          setSelectedScooter(event.features[0].properties.scooter);
        }
    };

  return (
    <ShapeSource id="scooter" cluster shape={featureCollection(points)} onPress={onPointPress}>
      <SymbolLayer
        id="clusters-count"
        style={{
          textField: ['get', 'point_count'],
          textSize: 18,
          textColor: '#ffffff',
          textPitchAlignment: 'map',
        }}
      />

      <CircleLayer
        id="clusters"
        belowLayerID="clusters-count"
        filter={['has', 'point_count']}
        style={{
          circlePitchAlignment: 'map',
          circleColor: '#42E100',
          circleRadius: 20,
          circleOpacity: 1,
          circleStrokeWidth: 2,
          circleStrokeColor: 'white',
        }}
      />

      <SymbolLayer
        id="scooter-icons"
        filter={['!', ['has', 'point_count']]}
        style={{
          iconImage: 'pin',
          iconSize: 0.5,
          iconAllowOverlap: false,
          iconAnchor: 'bottom',
        }}
      />

      <Images images={{ pin }} />
    </ShapeSource>
  );
}

export default ScooterMarkers