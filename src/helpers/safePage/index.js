/**
 * @author: Xu Ke
 * @date: 2020/1/8 6:21 PM
 * @Description: 防止render闪退, 不能捕获子孙组件
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import ErrorPage from '../../components/ErrorPage';

const safeComponent = (componentFn, props) => {
  try {
    return componentFn(props);
  } catch (err) {
    console.log(err, 'page_crash');
    return <ErrorPage {...props} />;
  }
};

export default safeComponent;
