import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer class="footer">
                <div>
                    <a href="/">Acceuil</a>
                </div>
                <div>
                    <a href="/">Nous Contactez</a>
                </div>
                <div>
                    <span>Powered by </span>
                    <a href="#">ATOME</a>
                </div>
            </footer>
        )
    }
}