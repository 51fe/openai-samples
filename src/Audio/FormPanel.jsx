import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Form, Input, Radio, Space } from 'antd';
import FilePicker from '../components/FilePicker';
import { AUDIO_HELP } from '../components/help';

const { TextArea } = Input;

const initialPrompt = '此处，需要加标点。谢谢！';

const FormPanel = ({ onFinish, loading }) => {
  const [form] = Form.useForm();
  const selectFiie = (file) => {
    form.setFieldValue('file', file);
    form.validateFields(['file'])
  }

  const changeLang = (e) => {
    switch (e.target.value) {
      case 'zh':
        form.setFieldValue('prompt', initialPrompt);
        break;
      case 'en':
        form.setFieldValue('prompt', 'Umm, let me think like, hmm...' +
          "Okay, here's what I'm, like, thinking.");
        break;
      default:
        form.setFieldValue('prompt', '');
        break;
    }
  };

  return (
    <Card
      type="inner"
      title="操作"
      extra={
        <Button type="link"
          title={AUDIO_HELP}
          icon={<QuestionCircleTwoTone />}
          shape="circle"
          size="large"
        />
      }
    >
      <Form
        form={form}
        name="audio"
        colon={false}
        initialValues={{
          file: null,
          lang: undefined,
          prompt: initialPrompt
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="文件"
          name="file"
          rules={[{ required: true, message: '请选择一个文件' }]}>
          <FilePicker
            onSelect={selectFiie}
          />
        </Form.Item>

        <Form.Item
          label="语言"
          name="lang">
          <Radio.Group buttonStyle="solid" onChange={changeLang}>
            <Radio.Button value="zh">中文</Radio.Button>
            <Radio.Button value="en">英语</Radio.Button>
            <Radio.Button value="fr">法语</Radio.Button>
            <Radio.Button value="ru">俄语</Radio.Button>
            <Radio.Button value="de">德语</Radio.Button>
            <Radio.Button value="ko">韩语</Radio.Button>
            <Radio.Button value="ja">日语</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="提示"
          name="prompt">
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? '提取中…' : '开始提取'}
            </Button>
            <Button
              type="text"
              onClick={() => form.resetFields()}
            >重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
};

export default FormPanel;