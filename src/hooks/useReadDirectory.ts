import React, {useState} from 'react';
import RNFS from 'react-native-fs';

import {folder} from '@/screens/CameraScreen';

const useReadDirectory = () => {
  const [pics, setPics] = useState<RNFS.ReadDirItem[]>();

  const readDirectory = async () => {
    const res = await RNFS.readDir(folder);
    setPics(res);
  };

  return {
    readDirectory,
    pics,
  };
};

export default useReadDirectory;
