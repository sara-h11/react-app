
import {Badge, Button, Table} from 'antd';
import { Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { counterValue, incrementByAmount, reset } from 'components/counter/counterSlice';
import Header from 'components/Header';
import { PostProps } from './PostProps';
import { fetchData, postSelector } from './post.slice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';

    function genColumn(name : string){
        return(
            {
                title: name[0].toUpperCase() + name.slice(1) ,
                dataIndex: name,
                key: name ,
              }
        )
    }
  const columns: ColumnsType<PostProps> = [
    {
        ...genColumn('userId')
    },
    {
        ...genColumn('id')
     
    },
    {
        ...genColumn('title'),
        title : "عنوان"
    },
    {
        ...genColumn('body')
    },
  ];

function Posts() {
    
//    const {currentPage , totalCount , setPageSize , setCurrentPage , posts , loading } = useFetchData<PostProps>('posts');
   const dispatch = useAppDispatch();
   const countValue = useSelector(counterValue);
   const postSelect = useAppSelector(postSelector);
   useEffect(() => {
        dispatch(fetchData({page : 1 , pageSize: 10}))
   }, []);
    return ( 
        <>  
            <Header title='Posts' content="posts" />
            <Button  style={{ backgroundColor: '#52c41a' }}className="m-2" onClick={() => dispatch(incrementByAmount(10))} type='primary'>Add by 10</Button>
            <Badge count={countValue}>
                <Button  danger className="m-2" onClick={() => dispatch(reset())} type='primary'>reset counter</Button>
            </Badge>
            <Pagination defaultCurrent={postSelect.page} total={postSelect.total} defaultPageSize={postSelect.pageSize}
            
            onChange={(page , pageSize ) => dispatch(fetchData({page , pageSize}))}/>
            <Table rowKey="id" columns={columns} dataSource={postSelect.data} pagination={false} loading={postSelect.loading}/>
            
        </>
     );
}

export default Posts;