import { Row, Watermark } from "antd";
import React from "react";

const Header = ({ logo, title }) => {
  return (
    <Watermark content="riafan.com" >
      <Row>
        <img src={logo} style={{ width: '32px', objectFit: 'contain', margin: 'auto 10px auto 0' }} />
        <h1>{title}</h1>
      </Row>
    </Watermark>
  )
};

export default Header;
