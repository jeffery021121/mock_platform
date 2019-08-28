// hoc文件夹内，如果简单就是单文件，如果复杂，就是文件夹，统一通过本文件透出即可
import Vali, { IvaliRenderProps } from './Validate' // 不带antdForm,纯数据处理
import CheckForm, { IcheckFormRenderProps } from './ValidateForm' // 带antdform
/* 
两套check的方案绝对是行不通的，一定要合并成一个，而且还得出一个js版本的，
可以直接使用tsc编译试试，实在不行用到form的地方通过参数传入
*/
export { CheckForm, IcheckFormRenderProps, IvaliRenderProps, Vali }
