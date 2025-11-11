pipeline {
  environment {
    REPOSITORY_NAME = getRepositoryName()
  }
  agent { label 'runner'}
  stages {
    stage('build app and push to registry') {
      agent {
        label 'runner'
      }
      steps {
        script {
          sh "cp /var/lib/jenkins/envs/${env.BRANCH_NAME}.${env.REPOSITORY_NAME}.env .env"
          sh "docker build -f Dockerfile -t $registry/${env.REPOSITORY_NAME}-${env.BRANCH_NAME}:${env.BUILD_ID}  ."
          sh "docker push $registry/${env.REPOSITORY_NAME}-${env.BRANCH_NAME}:${env.BUILD_ID}"
        }
      }
    }
    stage('pull image and deploy') {
      agent {
        label getAgent(env.BRANCH_NAME)
      }
      steps {
        script {
          sh "docker pull $registry/${env.REPOSITORY_NAME}-${env.BRANCH_NAME}:${env.BUILD_ID}"
          sh "docker service update --image $registry/${env.REPOSITORY_NAME}-${env.BRANCH_NAME}:${env.BUILD_ID} ${env.BRANCH_NAME}_${env.REPOSITORY_NAME}"
        }
      }
    }
  }
  post {
    success {
    script {
        def previousSuccessfulCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: 'HEAD^'
        def currentCommit = env.GIT_COMMIT ?: 'HEAD'
        def commitRange = "${previousSuccessfulCommit}..${currentCommit}"
        def gitCommitsInfo = sh(script: "git log ${commitRange} --pretty=format:'%s%n%an'", returnStdout: true).trim()
        def lines = gitCommitsInfo.split("\n")
        def formattedMessage = ""
        def currentLength = 0
        def maxMessageLength = 1024
        def header = """Service : ${env.REPOSITORY_NAME}\nEnv Type : ${env.BRANCH_NAME}\nVersion : ${env.BUILD_NUMBER}\n\n💬 Release Notes : \n"""
        def maxFormattedMessageLength = maxMessageLength - header.length()

        if (lines.size() == 0) {
            formattedMessage = "No new commits since the last successful build."
        } else {
            lines.eachWithIndex { line, idx ->
                def lineToAdd = ""
                if (idx % 2 == 0) {
                    lineToAdd = """- ${line}\n"""
                } else {
                    lineToAdd = """👨‍💻<i>${line}</i>\n\n"""
                }
                if (currentLength + lineToAdd.length() <= maxFormattedMessageLength) {
                    formattedMessage += lineToAdd
                    currentLength += lineToAdd.length()
                } else {
                    formattedMessage += "... (truncated)"
                    return  // Exit the loop when max length is reached
                }
            }
        }

        def message = header + formattedMessage

        // Ensure the final message does not exceed 1024 characters
        if (message.length() > maxMessageLength) {
            message = message.substring(0, maxMessageLength - 3) + "..."
        }

        withCredentials([string(credentialsId: 'notification_bot_token', variable: 'TOKEN')]) {
            sh("""curl -s -X POST https://api.telegram.org/bot$TOKEN/sendMessage -d chat_id=$telegram_group_id -d parse_mode=HTML -d text='$message'""")
        }
    }
    }
    aborted {
      echo 'aborted'
    }
    failure {
      echo 'failure'
    }
  }
}

def getAgent(String branch) {
  switch (branch) {
    case 'dev':
      return 'app'
    case 'master':
      return 'cbu-app'
    case 'sandbox':
      return 'sandbox-apps'
    default:
      return 'none'
  }
}

def getRepositoryName() {
    def gitUrl = env.GIT_URL
    if (gitUrl) {
        return gitUrl.tokenize('/').last().replace('.git', '')
    } else {
        error("GIT_URL environment variable is not set. Make sure this is a Git-based project.")
    }
}

