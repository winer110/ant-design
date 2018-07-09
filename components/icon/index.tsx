import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import { AntdIcon } from 'react-antd-icons/esm';
import { library, antDesignIcons } from "antd-icons/esm";

library.add(...antDesignIcons);

export interface IconProps {
  type?: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

const Icon: React.SFC<IconProps> = (props) => {
  const { type, className = '', spin } = props;
  const classString = classNames({
    anticon: true,
    'anticon-spin': !!spin || type === 'loading'
  }, className);

  const content = type ? <AntdIcon type={type}/> : (
    <svg width={'1em'} height={'1em'} fill={'currentColor'}>
      {props.children}
    </svg>
  );
  return (
    <i className={classString} {...omit(props, ['type', 'spin'])}>
      {content}
    </i>
  );
};

export interface CustomIconProps {
  type: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<any>;
  spin?: boolean;
  style?: React.CSSProperties;
}

export interface CustomIconOptions {
  namespace: string;
  prefix?: string;
  scriptLink?: string;
}

(Icon as any).create = create;

const customIconsCache: { [namespace: string]: boolean } = {};

function create({ namespace, prefix, scriptLink }: CustomIconOptions) {
  return class CustomIcon extends React.Component<CustomIconProps> {

    componentDidMount() {
      if (document && typeof document.createElement === 'function' && !customIconsCache[namespace] && scriptLink) {
        const script = document.createElement('script');
        script.src = scriptLink;
        customIconsCache[namespace] = true;
        document.body.appendChild(script);
      }
    }

    render() {
      const { type, ...rest } = this.props;
      return (
        <Icon {...rest}>
          <use xlinkHref={`#${prefix}${type}`}/>
        </Icon>
      );
    }
  };
}

export default Icon;
