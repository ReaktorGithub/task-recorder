/** @format */
import {useEffect, useState} from 'react';

const useFavicon = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    const favicon = document.getElementById('link');

    if (favicon) {
      const newPath = isRecording ? '/favicon-record.svg' : '/favicon-pause.svg';
      favicon.setAttribute('href', newPath);
    }
  }, [isRecording]);

  return {
    onRecord: setIsRecording,
  };
};

export {useFavicon};
