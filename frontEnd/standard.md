# 书写规范

> 前端书写规范使用 tslint 和 prettier 来束缚。 这里主要定义的是开发规范

## 开发规范之 路由

> 所有的路由都异步加载

## 开发规范之 model

> model 统一使用异步注册的方式来实现

## 开发规范之 components

## 开发规范之 逻辑处理和数据处理

## 开发规范之 工具函数和工具组件

> 工具函数如 model 防重复函数，工具组件如异步加载页面，卡顿时长超过 200ms 的处理组件等统一写在 src 下的 util 组件中。

### 分割线

- 处理 mapstate 函数，如果返回值不是固定的 store.prop，有自定义类型的时候

```js
type MapProps<NewState> = (state: Store, ownProps?: any) => NewState;
function returnType<NewState>(mapStateToProps: MapProps<NewState>) {
  return {} as any as NewState;
}

function mapStateToProps(state: Store, ownProp?: any) {
  return {
    ...state.signUp,
    a: '',
    asdfasdfasdfasdf:'',
  };
};

const mockNewState = returnType(mapStateToProps);
```
