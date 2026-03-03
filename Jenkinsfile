pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Apache') {
            steps {
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r dist/* /var/www/html/
                '''
            }
        }
    }
}
