module.exports = {
    apps: [
        {
            name: 'action-server',
            script: 'bash',
            args: '-c "source rasa_env/bin/activate &&  " rasa run actions --port 5055 "',
            env: {
            }
        }
    ]
};