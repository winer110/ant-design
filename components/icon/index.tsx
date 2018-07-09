import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { AntdIcon } from 'react-antd-icons/esm';
import { library, antDesignIcons } from "antd-icons/esm";

library.add(...antDesignIcons);

export interface IconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading'
  }, className);
  return (
    <AntdIcon type={type} className={classString} {...omit(this.props, ['type', 'spin'])}/>
  );
};

export default Icon;
