import React, { forwardRef, useEffect, useState } from "react";

import { Button, Card, Input, message, Space } from "antd";
import { CopyTwoTone, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const OuputPanel = ({ output, rows = 14, totalTokens, clear }) => {

  const [value, setValue] = useState(output);

  useEffect(() => {
    setValue(output)
  }, [output]);

  const copyText = () => {
    navigator.clipboard.writeText(value).then(() => {
      message.success('复制成功');
    }).catch(() => {
      message.error('复制失败');
    })
  };

  return (
    <Card
      type="inner"
      title="输出"
      extra={
        <Space>
          <Button
            type="text"
            title="复制"
            icon={<CopyTwoTone />}
            onClick={copyText}
          />
          <Button
            type="text"
            title="清空"
            icon={<DeleteOutlined />}
            onClick={clear}
            style={{ color: '#900' }}
          />
          共计<strong>{value.length}</strong> 个字
        </Space>
      }
    >
      <TextArea
        value={value}
        id="output"
        rows={rows}
        onChange={(e) => setValue(e.target.value)}
      />
    </Card>
  )
};

export default OuputPanel;
