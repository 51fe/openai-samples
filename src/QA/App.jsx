import { useState } from 'react';
import axios from 'axios';
import { Col, message, Row } from 'antd';
import FormPanel from './FormPanel';
import { QA_HELP } from '../components/help';
import Header from '../components/Header';
import OuputPanel from '../components/OuputPanel';
import logo from '../assets/chat.svg';

const App = () => {
  const key = 'CHRT_GPT';
  let qaHelp = localStorage.getItem(key) || ''
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(qaHelp || QA_HELP);

  const onFinish = (values) => {
    const { prompt, outputMode } = values;
    const url = `${import.meta.env.VITE_BASE_URL}/v1/completions`;
    setLoading(true);
    axios.post(url, {
      model: 'text-davinci-003',
      temperature: 0,
      max_tokens: 1024,
      prompt
    }).then(({ data }) => {
      message.success('请求成功');
      const text = data.choices[0].text.replace('\n\n', '');
      const record = `问题：${prompt}\n答案：${text}\n\n`;
      if (outputMode === 'append') {
        qaHelp += record;
      } else {
        qaHelp = record;
      }
      setOutput(qaHelp);
      window.localStorage.setItem('CHRT_GPT', qaHelp);
      // scroll to current record
      const ta = document.getElementById('output');
      ta.scrollTop = ta.scrollHeight;

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
        title="助理小 C"
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
            output={output}
            clear={clearText}
          />
        </Col>
      </Row>
    </>
  );
};

export default App;