import { QuestionCircleTwoTone } from '@ant-design/icons';
import { Button, Card, Form, Input, Radio, Space } from 'antd';
import { QA_HELP } from '../components/help';

const { TextArea } = Input;

const FormPanel = ({ onFinish, loading }) => {
  const [form] = Form.useForm();
  return (
    <Card
      type="inner"
      title="操作"
      extra={
        <Button type="link"
          title={QA_HELP}
          icon={<QuestionCircleTwoTone />}
          shape="circle"
          size="large"
        />
      }
    >
      <Form
        name="qa"
        form={form}
        initialValues={{
          outputMode: 'append',
          prompt: ''
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="输出方式"
          name="outputMode"
        >
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="append">追加</Radio.Button>
            <Radio.Button value="replace">替换</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="提示"
          name="prompt"
          rules={[{ required: true, message: '提示不能为空' }]}
        >
          <TextArea
            rows={8}
            placeholder="想问啥在这里输入…"
          />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right' }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              {loading ? '思考中…' : '开始提问'}
            </Button>
            <Button type="text" onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
};

export default FormPanel;