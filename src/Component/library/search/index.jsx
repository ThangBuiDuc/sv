import style from './index.module.css'
import Table from './table'


function LibrarySearch(){
    return <div className= {style.wrap}>
    <div style={{display:'flex',justifyContent:'center'}}><h2 style={{color:'#0083C2'}}>Thông tin sách đang mượn</h2></div>
    <Table/>
</div>
}



export default LibrarySearch