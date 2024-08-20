module.exports = {
    apps: [
        {
            name: 'rasa-server',
            script: 'bash',
            args: '-c "source rasa_env/bin/activate && rasa run -m models --enable-api --cors \'*\'"',
            env: {
                RASA_PRO_LICENSE: ""
            }
        }
    ]
};