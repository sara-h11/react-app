import { Pagination , Checkbox , Table} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import useFetchData from '../hooks/useFetchData';
import Header from './Header';

  interface TodoProps{
    "userId": number,
    "id": number,
    "title":string,
    "completed" : boolean
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
  const columns: ColumnsType<TodoProps> = [
    {
        ...genColumn('userId')
    },
    {
        ...genColumn('id')
     
    },
    {
        ...genColumn('title'),
    },
    {
        ...genColumn('completed'),
        render: (completed :boolean) => <Checkbox defaultChecked disabled checked={completed} />
    },
  ];

function Todos() {
    
   const {currentPage , totalCount , setPageSize , setCurrentPage , posts , loading } = useFetchData<TodoProps>('todos')
    return ( 
        <>  
            <Header title='Todos' content='todos' />
            <Pagination defaultCurrent={currentPage} total={totalCount} 
            onShowSizeChange={(current, size) => setPageSize(size)} 
            onChange={(page ) => setCurrentPage(page)}/>
            <Table rowKey="id"  columns={columns} dataSource={posts} pagination={false} loading={loading}/>
            
        </>
     );
}

export default Todos;