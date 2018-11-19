import React, { Component } from 'react';
import { Provider } from 'mobx-react'
import Head from 'next/head';
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    background : #f9f9f9;
    font-family: 'Kanit', sans-serif ;
  }
`

export default function withApp(WrappedComponent) {
    return class App extends Component{
        render(){
            return (
                <Provider >
                    <main>
                        <Head>
                            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"/>
                            <link href="https://fonts.googleapis.com/css?family=Kanit" rel="stylesheet"/>                        
                            <link href="/static/vendor/node_modules/froala-editor/css/froala_style.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/froala-editor/css/froala_editor.pkgd.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/animate.css/animate.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/toastr/build/toastr.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/react-dates/lib/css/_datepicker.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/react-select/dist/react-select.css" rel="stylesheet"/>
                            <script src="/static/vendor/node_modules/jquery/dist/jquery.min.js"/>
                            <script src="/static/vendor/node_modules/froala-editor/js/froala_editor.pkgd.min.js"/>                            
                        </Head>
                        <WrappedComponent {...this.props}/>
                    </main>
                </Provider>
            )
        }
    }
}