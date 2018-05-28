import React, { Component } from 'react';
import './App.css';

function navbar(){
  return(
    <nav className="navbar navbar-default" style={{marginBottom: 0, borderRadius: 0}}>
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">Entretenibit</a>
        </div>

        <div className="collapse navbar-collapse" id="myNavbar">
          <ul className="nav navbar-nav">
            <li><a href="/aboutus">Sobre Nós</a></li>
            <li><a href="/register">Cadastre-se</a></li>
            <li><a href="https://github.com/martchellop/Entretenibit">Nosso Projeto</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {navbar()}
        <div className="container-fluid jumbotron">
          <h1>Entretenibit</h1>
          <h3><small>Sua querida base de eventos.</small></h3>
        </div>
      </div>
    );
  }
}

export default App;
