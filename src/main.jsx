import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import App from './App.jsx'
import 'normalize.css/normalize.css'
import './index.css'
import {ConfigProvider} from "antd";

createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
)
