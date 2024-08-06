import React, { useEffect } from 'react';
import Widget from 'rasa-webchat';
import './App.css';

function App() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = `
      default-src 'self';
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com data:;
      img-src 'self' data: https://i.imgur.com ;
      connect-src 'self' ${process.env.STRAPI_ADMIN_RASA_URL} ws://${process.env.STRAPI_ADMIN_RASA_URL};
    `;
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Rasa Webchat with React</h1>
      </header>
      <Widget
        initPayload={"/get_started"}
        socketUrl={process.env.STRAPI_ADMIN_RASA_URL}
        socketPath={"/socket.io/"}
        customData={{ "language": "en" }}
        title={"Chat with us"}
      />
    </div>
  );
}

export default App;
