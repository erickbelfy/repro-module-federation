(self.webpackChunkauthentication_ui=self.webpackChunkauthentication_ui||[]).push([[779,800],{35800:function(r,e,t){!function(r,e){"use strict";function t(r){if(r&&r.__esModule)return r;var e=Object.create(null);return r&&Object.keys(r).forEach((function(t){if("default"!==t){var n=Object.getOwnPropertyDescriptor(r,t);Object.defineProperty(e,t,n.get?n:{enumerable:!0,get:function(){return r[t]}})}})),e.default=r,Object.freeze(e)}var n=t(e);function o(r,e){return o=Object.setPrototypeOf||function(r,e){return r.__proto__=e,r},o(r,e)}var a={error:null},u=function(r){function e(){for(var e,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=r.call.apply(r,[this].concat(n))||this).state=a,e.resetErrorBoundary=function(){for(var r,t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];null==e.props.onReset||(r=e.props).onReset.apply(r,n),e.reset()},e}var t,u;u=r,(t=e).prototype=Object.create(u.prototype),t.prototype.constructor=t,o(t,u),e.getDerivedStateFromError=function(r){return{error:r}};var i=e.prototype;return i.reset=function(){this.setState(a)},i.componentDidCatch=function(r,e){var t,n;null==(t=(n=this.props).onError)||t.call(n,r,e)},i.componentDidUpdate=function(r,e){var t,n,o,a,u=this.state.error,i=this.props.resetKeys;null!==u&&null!==e.error&&(void 0===(o=r.resetKeys)&&(o=[]),void 0===(a=i)&&(a=[]),o.length!==a.length||o.some((function(r,e){return!Object.is(r,a[e])})))&&(null==(t=(n=this.props).onResetKeysChange)||t.call(n,r.resetKeys,i),this.reset())},i.render=function(){var r=this.state.error,e=this.props,t=e.fallbackRender,o=e.FallbackComponent,a=e.fallback;if(null!==r){var u={error:r,resetErrorBoundary:this.resetErrorBoundary};if(n.isValidElement(a))return a;if("function"==typeof t)return t(u);if(o)return n.createElement(o,u);throw new Error("react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop")}return this.props.children},e}(n.Component);r.ErrorBoundary=u,r.useErrorHandler=function(r){var e=n.useState(null),t=e[0],o=e[1];if(null!=r)throw r;if(null!=t)throw t;return o},r.withErrorBoundary=function(r,e){var t=function(t){return n.createElement(u,e,n.createElement(r,t))},o=r.displayName||r.name||"Unknown";return t.displayName="withErrorBoundary("+o+")",t},Object.defineProperty(r,"__esModule",{value:!0})}(e,t(60822))}}]);
//# sourceMappingURL=chunk.779.bf5af3d166359c9cdc4d.js.map