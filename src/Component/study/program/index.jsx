import style from './index.module.css';
import ProgramTable from './table';

function Program(){

    
      return (
        <div className= {style.wrap}>
            <div style={{display:'flex',justifyContent:'center'}}><h2 style={{color:'#0083C2'}}>Chương trình đào tạo</h2></div>
            <ProgramTable/>
            <p>✷: <i>Những môn học không bắt buộc</i></p>
        </div>
      )
}

export default Program;