import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Text } from 'react-native';

import Map from '~/components/Map';
import SelectedScooterSheet from '~/components/SelectedScooterSheet';

const App = () => {
  return (
    <>
      <Map />
      <SelectedScooterSheet />
    </>
  );
};

export default App;
