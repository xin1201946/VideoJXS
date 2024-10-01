import {useEffect, useState} from 'react';
import {FaMicroblog, FaReact, FaTelegram} from "react-icons/fa";
import {CopyOutlined, DeleteOutlined, GithubOutlined, SettingOutlined, XOutlined} from '@ant-design/icons';
import {
    Alert,
    Avatar,
    Button,
    Card,
    Collapse,
    ConfigProvider,
    Descriptions,
    Drawer,
    Flex,
    FloatButton,
    Input,
    Layout,
    List,
    message,
    notification,
    Popconfirm,
    Radio,
    Select,
    Space,
    theme,
    Timeline,
    Tooltip
} from 'antd';
import './App.css'
import "./assets/react.svg"
import './Theme.css'
import 'normalize.css/normalize.css'
import Meta from "antd/es/card/Meta";

const { defaultAlgorithm, darkAlgorithm } = theme;
let XLValue = "线路1"
let url_path = ''
let result_path = ''
let doneTime=[//完成进度时间线
    {
        children: '停止功能性更新，进入维护状态',
        color: 'blue',
    },
    {
        children: '完成项目搭建',
        color: 'green',
    },
    {
        children: '允许用户保存设置',
        color: 'green',
    },
    {
        children: '完成界面布局',
        color: 'green',
    },
    {
        children: <p>更换UI为<a href="https://ant-design.antgroup.com/">Ant Design</a></p>,
        color: 'green',
    },
    {
        children: '采用React+Vue结构搭建基础布局',
        color: 'green',
    },
]
let update_data=[
    '支持保存用户的Url和线路',
    '美化UI',
    '优化使用体验',
    '同时 也带来了更多的Bug',
];
const hitokoto_api='https://v1.hitokoto.cn/?c=f'
const urls = [
    "https://jx.xmflv.com/?url=",
    "https://cp.987654321.icu/jiexi.php?url=",
    "http://jiexi.vipno.cn/?v=",
    "https://jx.wujiyan.cc/?url=",
];
let Cunchuitems =[
    {
        key: '1',
        label: '线路',
        children: localStorage.getItem('XL'),
    },
    {
        key: '2',
        label: 'UrlPath',
        children: <p>{localStorage.getItem('urlPath')}</p>,
    }
]
const urlDict = {};
function App() {
    const [messageApi, ToasttextHolder] = message.useMessage();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const iframeA=document.createElement('myIframe');
    const autoRsize = () => {
        var baseWidth = 1920;
        var zoomValue = window.innerWidth / baseWidth;
        const windowInfo = {
            width: window.innerWidth,
            hight: window.innerHeight
        }
        iframeA.style.width = (window.innerWidth*0.5) + 'px';
        iframeA.style.height = (window.innerHeight*0.5) + 'px';
        document.getElementById("App").style.transform ="scale(" + zoomValue + "," + zoomValue + ")";
        console.log(windowInfo);
    };
    const debounce = (fn, delay) => {
        let timer;
        return function() {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn();
            }, delay);
        }
    };
    const cancalDebounce = debounce(autoRsize, 500);

    function VideoPlayer(){
        return (
            <iframe width="0" height="0" src={result_path}
                    id={'myIframe'}
                    title="VideoPlayer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        )
    }

    function XLselect() {
        useEffect(() => {
            document.title = 'VideoPlayer';
            document.querySelector('body').style.userSelect = 'none';
            loadata()
        });
        return (
            <Select
                id={'XLSelect'}
                size='middle'
                defaultValue={localStorage.getItem('XL') ?? '线路1'}
                onChange={handleChange}
                style={{
                    width: 200,
                }}
                options={options}
            />
        )
    }

    function loadata() {
        let cache,cache1,themecache;
        cache = localStorage.getItem('XL')
        cache1=localStorage.getItem('urlPath')
        XLValue = cache
        url_path=cache1
        console.log(XLValue)
        console.log(url_path)
        document.getElementById('searchUrl').value=url_path;
        document.getElementById('XLSelect').value = XLValue

        urls.forEach((url, index) => {
            urlDict[`线路${index + 1}`] = url;
        });
        return 1
    }
    const AboutZZCard =() =>{
        function get_github() {
            window.open('https://github.com/xin1201946')
        }

        function get_Twitter() {
            window.open('https://x.com/can_feng?t=tr7Cmvcj3sV_fUQaRw5oPA&s=09')
        }

        function get_blog() {
            window.open('https://www.talk.1201946.xyz/?i=1')
        }
        function get_telegram() {
            window.open('https://t.me/canfengs')
        }



        return(
            <Card
                style={{ width: 270 }}
                cover={
                    <img
                        alt="BackGroundImage"
                        src="https://t.mwm.moe/fj"
                    />
                }
            >
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Meta
                        avatar={<Avatar src="https://q.qlogo.cn/headimg_dl?dst_uin=1143922499&spec=640&img_type=jpg" />}
                        title="林间追风"
                        description="我们，在路上，勿忘初心。找寻最初的梦想和微弱的希望。"
                    />
                    <Flex align="center" justify="space-evenly">
                        <Button color="primary" onClick={get_github} variant="text" icon={<GithubOutlined/>}></Button>
                        <Button color="primary" onClick={get_Twitter} variant="text" icon={<XOutlined/>}></Button>
                        <Button color="primary" onClick={get_blog} variant="text" icon={<FaMicroblog />}></Button>
                        <Button color="primary" onClick={get_telegram} variant="text" icon={<FaTelegram  />}></Button>
                    </Flex>
                </Space>
            </Card>
        )
    }
    const Hitokoto_text =() => {
        fetch(hitokoto_api)
            .then(response => response.json())
            .then(data => {
                const hitokoto = document.querySelector('#hitokoto_text')
                hitokoto.innerText = data.hitokoto
            })
            .catch(console.error)
        return (
            <p id="hitokoto_text" style={{color:"gray"}}>
                :D 获取中...
            </p>
        )
    }
    const ToastView = () => {
        const [open, setOpen] = useState(false);

        let themecache = sessionStorage.getItem('Theme')
        if (themecache === null || themecache === undefined) {
            themecache='Light'
        }

        const showDrawer = () => {
            setOpen(true);
        };
        const onClose = () => {
            setOpen(false);
        };

        const copyUrl = () => {
            navigator.clipboard.writeText(localStorage.getItem('urlPath')).then(() => {
                console.log('文本已复制到剪贴板');
            });
            messageApi.info('文本已复制到剪贴板,♪(^∇^*)');
        }

        function lightMode() {
            console.log('L')
            document.querySelector('body').style.backgroundColor = 'white'
            document.getElementById('radiotheme').value='Light'
            sessionStorage.setItem('Theme','Light')
            setIsDarkMode(false)
        }
        function darkMode() {
            console.log('d')
            document.querySelector('body').style.backgroundColor = '#1F1F1F'
            document.getElementById('radiotheme').value='Dark'
            sessionStorage.setItem('Theme','Dark')
            setIsDarkMode(true)
        }
        const TimeView = () => {
            return(
                <Timeline
                    mode="alternate"
                    items={doneTime}
                />
            )
        }
        let aboutdata=[
            {
                icon:<Avatar src={`https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg`}/>,
                url:"https://ant-design.antgroup.com/",
                title: 'Ant Design',
                description:"提供React UI",
            },
            {
                icon:<Avatar src={`https://vitejs.cn/logo.svg`}/>,
                url:"https://vitejs.cn/vite3-cn/guide/",
                title: 'Vite',
                description:"下一代前端开发与构建工具",
            },
            {
                icon:<FaReact />,
                url:"https://zh-hans.react.dev/",
                title: 'React UI',
                description:"用于构建 Web 和原生交互界面的库",
            },
        ];

        function deleteStorage() {
            localStorage.setItem('urlPath','')
            messageApi.open({
                type: 'success',
                content: '成功删除',
                duration: 10,
            })
        }

        return (
            <>
                <FloatButton icon={<SettingOutlined/>} onClick={showDrawer}/>

                <Drawer title="设置" onClose={onClose} open={open} footer={<Hitokoto_text/>}>
                    <Collapse
                        accordion
                        items={[
                            {
                                key: '1',
                                label: '存储',
                                children: <Flex><Space direction="vertical">
                                    <Descriptions title="" bordered layout="vertical" items={Cunchuitems}/>
                                    <Flex align="center" justify="space-evenly">
                                        <Button type="default" shape="circle" onClick={copyUrl} icon={<CopyOutlined/>}/>
                                        <Popconfirm
                                            title="删除数据"
                                            description="确定要删除你的数据吗?这次操作无法恢复!"
                                            onConfirm={deleteStorage}
                                            onCancel={cancel}
                                            okText="对，我就要删"
                                            cancelText="我反悔了"
                                        >
                                            <Button shape="circle" icon={<DeleteOutlined/>} type="primary"
                                                    danger></Button>
                                        </Popconfirm>
                                    </Flex>

                                </Space></Flex>,
                            },
                            {
                                key: '2',
                                label: '主题模式',
                                children: <Flex><Space>
                                    <Radio.Group id={'radiotheme'} defaultValue={themecache} buttonStyle="solid">
                                        <Radio.Button onClick={lightMode} value="Light">向阳之端</Radio.Button>
                                        <Radio.Button onClick={darkMode} value="Dark">极黑之夜</Radio.Button>
                                    </Radio.Group>
                                </Space></Flex>
                            },
                            {
                                key: '3',
                                label: '完成进度',
                                children: <Flex><Space>
                                    <TimeView></TimeView>
                                </Space></Flex>
                            },
                            {
                                key: '4',
                                label: '本项目使用的开源项目',
                                children: <Flex gap="middle" vertical>
                                    <Alert
                                        message="简介"
                                        description="没有这些开源项目的支持就没有 VideoPlayer"
                                        type="info"
                                        showIcon
                                    />
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={aboutdata}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={item.icon}
                                                    title={<a href={item.url}>{item.title}</a>}
                                                    description={item.description}
                                                />
                                            </List.Item>
                                        )}
                                    />

                                </Flex>
                            },
                            {
                                key: '5',
                                label: '更新日志',
                                children: <Flex vertical>
                                    <Space direction="vertical">
                                        <List
                                            size="small"
                                            header={<div>更新日志</div>}
                                            bordered
                                            dataSource={update_data}
                                            renderItem={(item) => <List.Item>{item}</List.Item>}
                                        />
                                    </Space>
                                </Flex>
                            },
                            {
                                key: '6',
                                label: '关于',
                                children: <Flex vertical>
                                    <Space direction="vertical">
                                        <Card title="关于 VideoPlayer" bordered={false} style={{width: 270}}>
                                            <p>版本: 2.0.0 LTS</p>
                                        </Card>
                                        <p>开发者:</p>
                                        <AboutZZCard/>
                                    </Space>
                                </Flex>
                            },

                        ]}
                    />
                </Drawer>
            </>
        );
    };

    const play = () => {

        url_path = document.getElementById('searchUrl').value;

        if (url_path !== '') {
            result_path = urlDict[XLValue] + url_path;
            console.log(result_path);
            localStorage.setItem('urlPath',url_path)
            const iframe = document.getElementById('myIframe');
            iframe.style.width = (window.innerWidth*0.5) + 'px';
            iframe.style.height = (window.innerHeight*0.5) + 'px';
            iframe.src = result_path;
            window.addEventListener('resize', cancalDebounce);
            document.addEventListener("close", function() {window.removeEventListener('resize', cancalDebounce);})
            notificationapi.success({
                message: '播放成功',
                description:
                    '观看愉快!',
                showProgress: true,
            });
        }else{
            notificationapi.open({
                message: 'Hi',
                description:
                    '咱写个Url不行？',
                showProgress: true,
            });
        }

    }
    const confirm = () => {
        url_path = '';
        document.getElementById('searchUrl').value = '';
        messageApi.open({
            type: 'success',
            content: '成功删除，你仍然可以刷新网页恢复',
            duration: 10,
            })
    };
    const cancel = () => {

    };

    const {Footer} = Layout;

    const options = [];
    for (let i = 1; i <= urls.length; i++) {
        options.push({
            value: '线路' + i.toString(),
            label: '线路' + i.toString(),
        });
    }
    const boxStyle = {
        width: '100%',
        height: 120,
        borderRadius: 6,
    };
    const [notificationapi, contextHolder] = notification.useNotification();
    const openNotification = (pauseOnHover, message, description) => () => {
        notificationapi.open({
            message: message,
            description:
            description,
            showProgress: true,
            pauseOnHover,
        });
    };
    const handleChange = (value) => {
        XLValue = value;
        console.log(`selected ${XLValue}`);
        save_data(XLValue)
        notificationapi.open({
            message: value,
            description:
                '切换成功',
            showProgress: true,
        });
    };

    const save_data = (data) => {
        localStorage.setItem('XL', data)
    };

    function onSelectsChange(value) {
        console.log(`selected ${value}`);
    }

    function onSelectsSearch(value) {
        console.log('search:', value);
    }

    return (
        <ConfigProvider theme={{algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm}}>
            {contextHolder}
            {ToasttextHolder}
            <h1 className={'logo'} id={'HeaderText'}>VideoPlayer</h1>
            <VideoPlayer></VideoPlayer>
            <Flex gap="middle" align="start" vertical>
                <Flex style={boxStyle} justify={"center"} align={"center"}>
                    <Space>
                        <Tooltip id={'Tooltip'} color={"orange"} placement="topLeft" title='输入Url地址'>
                            <Input placeholder="Url地址" id={'searchUrl'}/>
                        </Tooltip>

                        <XLselect></XLselect>
                        <Button onClick={play} type="primary">播放</Button>
                        <Popconfirm
                            title="删除Url"
                            description="确定要删除你刚刚填写的Url吗?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="对，我就要删"
                            cancelText="我反悔了"
                        >
                            <Button type="primary" danger>清空</Button>
                        </Popconfirm>
                        <ToastView/>
                    </Space>
                </Flex>
            </Flex>

        </ConfigProvider>
    )
}

export default App
