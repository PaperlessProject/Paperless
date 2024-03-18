import { useEffect } from 'react';
import {
  getAuthToken,
  start,
  process,
  download,
} from './pdf-utils/pdfFunctions';
import { publicKey } from '../keys.ts';
import './App.css';

export default function App() {
  const files = [
    {
      server_filename: 'cd29201ebe5257c95d9843.pdf',
      filename: 'test.pdf',
    },
    {
      server_filename: 'cd29201ebe5257c95d9843.pdf',
      filename: 'test.pdf',
    },
    {
      server_filename: 'cd29201ebe5257c95d9843.pdf',
      filename: 'test.pdf',
    },
  ];
  useEffect(() => {
    const runPdfFunctions = async () => {
      const bearerToken = await getAuthToken(publicKey);

      const startResponse = await start('compress', bearerToken);
      const { server, task } = startResponse;
      console.log('startResponse', startResponse);

      const processResponse = await process(
        server,
        task,
        'compress',
        files,
        bearerToken
      );
      console.log('processResponse', processResponse);

      const downloadResponse = await download(server, task, bearerToken);
      console.log('downloadResponse', downloadResponse);
    };

    runPdfFunctions();
  }, []);
  return <div></div>;
}
