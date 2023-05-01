import { useState } from 'react';
import axios from 'axios';
import { Col, message, Row } from 'antd';
import Header from '../components/Header';
import OuputPanel from '../components/OuputPanel';
import FormPanel from './FormPanel';
import { AUDIO_HELP } from '../components/help';
import logo from '../assets/audio.svg';

const App = () => {
  const key = 'OAI_AUDIO';
  let audioRecord = localStorage.getItem(key) || ''
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(audioRecord || AUDIO_HELP);

  const onFinish = (values) => {
    const { file, lang, prompt } = values;
    const url = `${import.meta.env.VITE_BASE_URL}/v1/audio/transcriptions`;
    const formData = new FormData();
    formData.append('model', 'whisper-1');
    formData.append('file', file);
    formData.append('prompt', prompt);
    if (lang) {
      formData.append('language', lang);
    }
    setLoading(true);
    axios.post(url, formData).then(({ data }) => {
      message.success('提取成功');
      audioRecord = data.text;
      setOutput(audioRecord);
      window.localStorage.setItem(key, audioRecord);
    }).catch(() => {
      message.error('不好意思，开小差了😓');
    }).finally(() => {
      setLoading(false);
    })
  };

  const clearText = () => {
    localStorage.removeItem(key);
    setOutput('');
  }

  return (
    <>
      <Header
        logo={logo}
        title="助理小 A"
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={9}>
          <FormPanel
            onFinish={onFinish}
            loading={loading}
          />
        </Col>
        <Col flex="auto">
          <OuputPanel
            rows={12}
            output={output}
            clear={clearText}
          />
        </Col>
      </Row>
    </>
  );
};

export default App;