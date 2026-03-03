pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/BhushanC23/Technostav-Sanjivani-University-.git'
            }
        }

        stage('Deploy to Apache') {
            steps {
                sh '''
                cp -r * /var/www/html/
                '''
            }
        }
    }
}
