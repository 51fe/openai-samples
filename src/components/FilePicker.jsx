import React, { useState } from "react";
import { Button, message, Upload } from "antd";
import { FolderOpenTwoTone } from '@ant-design/icons';

const defaultFileType = 'audio/mpeg';
const defaultFormat = '.mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm';
const defaultLimitedSize = 5 * 1024;

const FilePicker = ({
  accept = defaultFormat,
  fileType = defaultFileType,
  limitedSize = defaultLimitedSize,
  onSelect
}) => {
  const [fileName, setFileName] = useState('选择文件');
  const _props = {
    beforeUpload: (file) => {
      if (file.size > limitedSize * 1024) {
        message.error(`文件不能大于 ${limitedSize} /1024 MB`);
      } else if (file.type !== fileType) {
        message.error('文件格式不正确');
      } else {
        setFileName(file.name);
        onSelect(file);
      }
      return false;
    },
    fileList: [],
  };
  return (
    <>
      <Upload {..._props} accept={accept}>
        <Button icon={<FolderOpenTwoTone />}>{fileName}</Button>
      </Upload>
    </>

  );
};

export default FilePicker;