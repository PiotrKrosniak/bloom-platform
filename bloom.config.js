module.exports = {
    apps: [
        {
            name: 'rasa-server',
            script: 'rasa',
            args: 'run -m models --enable-api --cors "*"',
            interpreter: '/bin/bash',
            interpreter_args: '-c "source /htdocs/bloom-platform/rasa/rasa_env/bin/activate && exec $PM2_EXEC_PATH $@"',
            env: {
                RASA_PRO_LICENSE: "XXX"
            }
        }
    ]
};