import React, { Component } from 'react';
import RootError from './RootError';

export default function withErrorBound(WrappingComponent) {
  return class Wrapped extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false
      };
    }

    static getDerivedStateFromError(error) {
      console.log(error);
      return {
        hasError: true;
      };
    }

    componentDidCatch(err) {
      console.log(err, 'catchErr');
      // 错误上报
    }

    render() {
      if (this.state.hasError) {
        return <RootError />;
      }

      return <WrappingComponent {...this.props} />;
    }
  };
};
