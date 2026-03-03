pipeline {
    agent any

    stages {

        stage('Deploy to Apache') {
            steps {
                sh '''
                rm -rf /var/www/html/*
                cp -r * /var/www/html/
                '''
            }
        }
    }
}
