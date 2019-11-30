import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { AutoComplete, Input, Icon, Layout, Badge, Button } from 'antd';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import jwt_decode from 'jwt-decode';
import Link from 'next/link'


import Scrollbar from 'react-scrollbars-custom'
import config from '../Config'

import 'antd/dist/antd.css';


const BASE_URL = config.BASE_URL;
const { Header, Content, Footer } = Layout;
const { Option } = AutoComplete;

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hn: '00082621',
      dataSource: [],
      filePath: '',
      numPages: null,
      pageNumber: 1,
      pageArr: [],
      size: 'large',
      arr: [],
      arr_page: [],
      end_apge: 10,
      pagegination: 0,
      hn_select: '',
      pageWidth:1000,
      isShow : false,
      tname:'',
      username:'',
      isLoadFileError : true,
      data_null:[1]
    }
  }
  
  componentDidMount(){
    const token = localStorage.getItem('token')
    if(token === null){
      window.location = '/login';

    }else{
      const decoded = jwt_decode(token);
      // console.log(decoded)
      this.setState({
        tname:decoded.fullname,
        username : decoded.username
      })
    }
    
  }
  getPatient = async () => {
    // console.log(this.state.hn + 'dd')
    console.log(this.state.hn.length)
    if(this.state.hn.length > 4){
      try {
        const res = await axios.get(`${BASE_URL}/find-hn/${this.state.hn}`)
  
        console.log(res)
        this.setState({
          dataSource: res.data
        })
  
  
  
      } catch (error) {
        console.log(error)
      }
    }
    
  }
  onSelect = (value) => {

    console.log(value)
    this.setState({
      hn_select: value,
isShow:true,
isLoadFileError:true,
dataSource:[],
arr:[],
arr_page:[],
pageNumber:1
    })

    this.logAdd('view',value)

    // this.getPdf(value)

    // this.getPdf(value)
  }
  onSearch = searchText => {


    this.setState({
      hn: searchText,
  
    })
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({
      numPages,
      isLoading: false
    });
    let btn_page = Math.floor(numPages / this.state.end_apge) + 1



    for (let j = 0; j <= this.state.end_apge; j++) {
      this.state.arr.push(j)
    }

    for (let i = 1; i <= btn_page; i++) {
      this.state.arr_page.push(i)
    }
  }

  onClickSelect = (i) => {
    this.props.selectPdf(i)
  }


  clickPagination = i => {

    let end = this.state.end_apge * (i + 1)
    let start = end - this.state.end_apge
    let arr2 = []

    this.setState({
      arr: [],
      isLoading: true,
      pagegination: i
    })
    for (let j = start; j <= end; j++) {
      arr2.push(j)
    }


    this.setState({
      arr: arr2,
      isLoading: false
    })


  }

  //home
  onclickNext = () => {
    this.setState({
        pageNumber: this.state.pageNumber + 1
    })
}
onclickPre = () => {
    this.setState({
        pageNumber: this.state.pageNumber - 1
    })
}

onclickIn = () => {
  this.setState({
      pageWidth: this.state.pageWidth + 50
  })
}
onclickOut = () => {
  this.setState({
      pageWidth: this.state.pageWidth - 50
  })
}

onDocumentLoadMain = ({ numPages }) => {
  this.setState({ numPages });
}
onErrorMain =()=>{
  console.log('error')
  this.setState({ 
    isLoadFileError : false
   });

}


onSelectPdf = (i) => {
  this.setState({
      pageNumber: i
  })
  
}

/// log add
logAdd = async (status,hn)=>{
  let data = {
      id :null,
      username:this.state.username,
      status:status,
      hn:hn

  }

  try {
      const res = await axios.post(`${BASE_URL}/log-add`, data)

  } catch (error) {
      console.log(error)
  }

}



  render() {
    const { dataSource,pageNumber, numPages,isShow,isLoadFileError,data_null } = this.state
    const hn_null =   this.state.hn > 4  ? data_null.map(item => <Option key="1"></Option>)  :   data_null.map(item => <Option key="1">กรุณากรอกให้มากว่า 4 หลัก</Option>)
    const children =  dataSource.length>0 ? dataSource.map(item => <Option key={item.hn}>{item.tname}</Option>) : hn_null

    const listPdfCard = this.state.arr.map((item, i) => {

      return i === 0 ? '' : item > this.state.numPages ? '' :
        <div className="list-pages" style={{ marginTop: 10, marginLeft: 20, cursor: 'pointer' }} key={i}>
          <span><Badge overflowCount ={3000} count={item} /></span> <Page pageNumber={item} width={200} onClick={() => this.onSelectPdf(item)} />
        </div>
    })

    const pagenagin = this.state.arr_page.map((item, i) => {
      return <Button type="primary" size="small" onClick={() => this.clickPagination(i)} key={i}>{i + 1}</Button>
    })


    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" style={{ color: '#01A44C' }}><i className="glyphicon glyphicon-lock" /> SW SCAN CHART</a>
          <form className="form-inline">
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
            {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            <div className="btn-group">
    <button type="button" className="btn btn-outline-success">{ this.state.tname + ' ( ' + this.state.username + ' )'}</button>
  <button type="button" className="btn btn-outline-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span className="sr-only">Toggle Dropdown</span>
  </button>
  <div className="dropdown-menu" style={{ marginLeft:0 }}>
  {/* <div className="dropdown-menu" style={{ marginLeft:-70 }}> */}
  <Link href="/login" >
    <a className="dropdown-item" href="#">Logout</a>
    </Link>
   
  </div>
</div>

          </form>
        </nav>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <AutoComplete
            dataSource={children}
            style={{ width: 300 }}
            onSelect={this.onSelect}
            onSearch={this.onSearch}
            placeholder="กรอก HN xx"
          >

            <Input suffix={<Icon type="search" className="certain-category-icon" onClick={this.getPatient} />} />
          </AutoComplete>
        </div>
<hr />
{ isShow  ?  isLoadFileError ? 
        <div className="row">
          <div className="col-lg-2" >
            <div className="row">
              <Button.Group size="small" style={{ marginLeft: 20 }} >
                {pagenagin}
              </Button.Group>
            </div>
            <div className="row" style={{ marginLeft: 10 }}>

              Page No. {this.state.pagegination + 1}
            </div>
            {/* {console.log("./static/pdf/" + this.state.hn + " .pdf")} */}
            <Document
              file={"./static/pdf/" + this.state.hn_select + ".pdf"}
              onLoadSuccess={this.onDocumentLoad}

            >
              <Scrollbar style={{ height: 1000 }}>
                {this.state.isLoading ? <div style={{ textAlign: 'center', marginTop: 10 }}><Spin tip="Loading..."></Spin></div> : ''}

                {listPdfCard}
              </Scrollbar>
              {/* <Page pageNumber={pageNumber} width={1000} /> */}
            </Document>
          </div>
          <div className="col-lg-10" s>
            <div class="row justify-content-between">
              <div class="col-4">
                <Button.Group size="large">
                  <Button type="primary" onClick={this.onclickPre}>
                    <Icon type="left" />
                    ก่อนหน้า
                                    </Button>
                  <Button type="primary" onClick={this.onclickNext}>
                    ถ้ดไป
                            <Icon type="right" />
                  </Button>
                </Button.Group>

    <span> หน้า {this.state.pageNumber} / {this.state.numPages}</span>
              </div>
              {console.log(this.state.pageWidth)}
              <div class="col-4" style={{ textAlign:'right',marginRight:10}}>
              <Button.Group size="large" style={{ marginLeft: 20 }}>
                                    <Button type="primary" onClick={this.onclickIn}>
                                        <Icon type="zoom-in" />
                                        ขยาย
                            </Button>
                                    <Button type="primary" onClick={this.onclickOut}>
                                        <Icon type="zoom-out" />
                                        ย่อ
        
                            </Button>
                                </Button.Group>
                               
                        </div>
                        
    
            </div>
            <div className="row" style={{ marginTop:10}}>
                                <Document
                                             file={"./static/pdf/" + this.state.hn_select + ".pdf"}
                                onLoadSuccess={this.onDocumentLoadMain}
                                onLoadError ={this.onErrorMain}

                            >
                                <Page pageNumber={pageNumber} width={this.state.pageWidth} />
                            </Document>
                            {/* </ReactWaterMark> */}
                        
                        {/* <p>Page {pageNumber} of {numPages}</p> */}
                        </div>
          </div>
        </div>
        : <div style={{ textAlign:'center' ,fontSize:24}}>ไม่พบไฟล์</div>
: '' 
  }


      </div>

    )
  }
}
