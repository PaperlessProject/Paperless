import { useEffect } from 'react';
import {
  getAuthToken,
  start,
  upload,
  process,
  download,
} from './pdf-utils/pdfFunctions';
import { publicKey } from '../keys.ts';
import './App.css';

export default function App() {
  const file = new File([''], 'test.pdf', { type: 'application/pdf' });
  useEffect(() => {
    const runPdfFunctions = async () => {
      const bearerToken = await getAuthToken(publicKey);

      const startResponse = await start('compress', bearerToken);
      const { server, task } = startResponse;
      console.log('startResponse', startResponse);

      const uploadResponse = await upload(server, task, file, bearerToken);
      console.log('uploadResponse', uploadResponse);

      const processResponse = await process(
        server,
        task,
        'compress',
        file,
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
