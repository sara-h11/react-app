
import {Table} from 'antd';
import { Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useFetchData from '../hooks/useFetchData';
import Header from './Header';

  interface CommentProps{
    "postId": number,
    "id": number,
    "name":string,
    "email":string,
    "body":string
}
    function genColumn(name : string){
        return(
            {
                title: name[0].toUpperCase() + name.slice(1) ,
                dataIndex: name,
                key: name ,
              }
        )
    }
  const columns: ColumnsType<CommentProps> = [
    {
        ...genColumn('postId')
    },
    {
        ...genColumn('id')
     
    },
    {
        ...genColumn('name'),
    },
    {
        ...genColumn('email'),
    },
    {
        ...genColumn('body')
    },
  ];

const Comments = () =>{
    
   const {currentPage , totalCount , setPageSize , setCurrentPage , posts , loading } = useFetchData<CommentProps>('comments')
    return ( 
        <>  
            <Header title='Comments' content='comments' />
            <Pagination defaultCurrent={currentPage} total={totalCount} 
            onShowSizeChange={(current, size) => setPageSize(size)} 
            onChange={(page ) => setCurrentPage(page)}/>
            <Table rowKey="id" columns={columns} dataSource={posts} pagination={false} loading={loading}/>
            
        </>
     );
}

export default Comments;