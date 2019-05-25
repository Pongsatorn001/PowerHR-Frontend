import React, { Component } from 'react';
import { Provider } from 'mobx-react'
import Head from 'next/head';
import { injectGlobal } from 'styled-components'
import { initAuthStore } from '../stores';

injectGlobal`
  body {
    background : #efecec;
    @import url('https://fonts.googleapis.com/css?family=Kanit');
    font-family: 'Kanit', sans-serif !important;
  }
`

export default function withApp(WrappedComponent) {
    return class App extends Component{
        static async getInitialProps({ req }) {
            const isServer = !process.browser
            const authStore = initAuthStore(isServer)
            return { isServer }
        }

        constructor(props) {
            super(props)
            const isServer = !process.browser
            this.authStore = initAuthStore(isServer)
        }

        render(){
            return (
                <Provider authStore={this.authStore}>
                    <main>
                        <Head>
                            <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"/>
                            <link href="/static/vendor/node_modules/font-awesome/css/font-awesome.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/animate.css/animate.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/toastr/build/toastr.min.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/react-dates/lib/css/_datepicker.css" rel="stylesheet"/>
                            <link href="/static/vendor/node_modules/react-select/dist/react-select.css" rel="stylesheet"/>
                            <script src="/static/vendor/node_modules/jquery/dist/jquery.min.js"/>
                            <script src="/static/vendor/node_modules/froala-editor/js/froala_editor.pkgd.min.js"/>
                            <link href="/static/vendor/node_modules/react-toastify/dist/ReactToastify.min.css" rel="stylesheet"/>
                        </Head>
                        <WrappedComponent {...this.props}/>
                    </main>
                </Provider>
            )
        }
    }
}