import Document, { Head, Main, NextScript } from 'next/document'
import 'bootstrap/dist/css/bootstrap.css';

// import 'moment/locale/th';

export default class Mydocument extends Document {
    render() {
        return (
            <html>
                <Head>

                    <link rel="stylesheet" href="static/antd/dist/antd.css" />

                    <link href="https://fonts.googleapis.com/css?family=Prompt|Ubuntu:400,300" rel="stylesheet" />


                    <script src="https://cdnjs.cloudflare.com/ajax/libs/reactstrap/6.0.1/reactstrap.min.js"></script>
                    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


                </Head>
                <body className="sidebar-mini layout-fixed sidebar-collapse">
                    <Main />
                    <NextScript />




                </body>
            </html>
        )
    }

}