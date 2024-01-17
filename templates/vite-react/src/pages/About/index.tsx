import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setCounter } from '@/store/modules/about';
import BaseChart from '@/components/BaseChart';

const Index: React.FC<{}> = () => {
    const navigate = useNavigate();
    // 返回
    const handleBack = () => navigate(-1);
    // 前进
    const handleForward = () => navigate(1);
    // 刷新
    const handleRefresh = () => navigate(0);

    const actions = <div style={{ marginBottom: '16px' }}>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={handleBack}>返回</Button>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={handleForward}>前进</Button>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={handleRefresh}>刷新</Button>
        {/* 跳转路由 */}
        <Button type="primary" style={{ marginRight: '8px' }} onClick={() => navigate('/article/1')}>params</Button>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={() => navigate('/article?id=1')}>search</Button>
        <Button type="primary" style={{ marginRight: '8px' }} onClick={() => navigate('/article', { state: { id: 1 } })}>state</Button>
    </div>;

    // 通过useDispatch 派发事件
    const dispatch = useDispatch();

    // 通过useSelector直接拿到store中定义的value
    const { counter } = useSelector((store: any) => store.about);

    const [value, setValue] = useState(counter);

    useEffect(() => {
        // 监听 counter 变化
        console.log(counter);
    }, [counter])

    return <>
        {actions}
        <div>
            <InputNumber value={value} onChange={value => setValue(value)} />
            <Button onClick={() => dispatch(setCounter({ counter: value }))}>保存</Button>
        </div>
        <div style={{ height: 300, width: 300 }}>
        <BaseChart options={{
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }
            ]
        }} />
        </div>
    </>
}

export default Index;