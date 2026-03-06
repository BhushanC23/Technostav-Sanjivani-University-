pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Project') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                bat '''
                if not exist deploy mkdir deploy
                xcopy dist deploy /E /I /Y
                '''
            }
        }

    }
}
