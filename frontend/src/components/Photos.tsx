
import {Table , Image} from 'antd';
import { Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, Outlet } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import Header from './Header';
import { PhotoProps } from './PhotoProps';

    function genColumn(name : string){
        return(
            {
                title: name[0].toUpperCase() + name.slice(1) ,
                dataIndex: name,
                key: name ,
              }
        )
    }
  const columns: ColumnsType<PhotoProps> = [
    {
        ...genColumn('albumId')
    },
    {
        ...genColumn('id')
    },
    {
        ...genColumn('title'),
        render: (title: string, record) => (
            <Link to={"/photos/" + record.id}>{title}</Link>
        ),
           
    },
    {
        ...genColumn('thumbnailUrl'),
        render : (thumbnailUrl :string) => <Image  src={thumbnailUrl} />
    },
  ];

function Photos() {
    
   const {currentPage , totalCount , setPageSize , setCurrentPage , posts , loading } = useFetchData<PhotoProps>('photos')
    return ( 
        <>  
            <Header title='Photos' content='photos' />
            <Pagination defaultCurrent={currentPage} total={totalCount} 
            onShowSizeChange={(current, size) => setPageSize(size)} 
            onChange={(page ) => setCurrentPage(page)}/>
            <Outlet />
            <Table rowKey="id" columns={columns} dataSource={posts} pagination={false} loading={loading}/>
            
        </>
     );
}

export default Photos;