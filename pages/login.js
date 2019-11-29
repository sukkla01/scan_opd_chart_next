import React, { Component } from 'react'
import { Icon, Input, Button, Card, message } from 'antd';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import './main.css'
import 'bootstrap/dist/css/bootstrap.css';


import config from '../Config'


const BASE_URL = config.BASE_URL;


export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            textAlert: ''
        }
    }
    componentDidMount(){
        localStorage.removeItem('token')
    }

    onSubmit = async (e) => {

        e.preventDefault()

        if (this.state.username === '' || this.state.username === '') {

            this.onAlert('กรุณากรอกข้อมูลไม่ครบ')
            return ''
        }

        let data = JSON.stringify({
            password: this.state.password,
            username: this.state.username
        })

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };


        try {
            const res = await axios.post(`${BASE_URL}/signin`, data, axiosConfig)
            console.log(res)
            localStorage.setItem('token', res.data.token)
            this.logAdd()
            window.location = '/';

        } catch (error) {
            this.onAlert('username หรือ  passwrod ไม่ถูกต้อง')
        }
    }


    logAdd = async ()=>{
        let data = {
            id :null,
            username:this.state.username,
            status:'login',
            hn:''

        }

        try {
            const res = await axios.post(`${BASE_URL}/log-add`, data)

        } catch (error) {
            console.log(error)
        }

    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,

        })
    }

    onAlert = (text) => {
        message.error(text);
    };
    render() {
        return (
            <div className="container card-center">
                <div className="row justify-content-center">
                    <div className="col-5" style={{ textalign: 'center', boxShadow:20 }}>
                        <div className="card text-white bg-info mb-3" style={{ boxShadow:20}} >
                            <div className="card-header" style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>SW CHART OPD</div>
                            <div className="card-body" style={{ margin: 20 }}>
                                <div className="row">
                                    <span style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>username :</span>
                                </div>
                                <div className="row" style={{ marginTop: 8 }}>
                                    <Input placeholder="username" name="username" onChange={this.onChange} />

                                </div>
                                <div className="row" style={{ marginTop: 20 }}>
                                    <span style={{ marginLeft: 5, fontSize: 16, color: 'black' }}>Password :</span>
                                </div>
                                <div className="row" style={{ marginTop: 8 }}>
                                    <Input.Password placeholder="password" name="password" onChange={this.onChange} />


                                </div>
                                <div className="row" style={{ marginTop: 20 }}>
                                    {/* <Button type="secondary" block size="large" onClick={this.onSubmit}> เข้าสูระบบ </Button> */}
                                    <button  onClick={this.onSubmit} type="button" className="btn btn-secondary btn-lg btn-block">เข้าสูระบบ</button>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
