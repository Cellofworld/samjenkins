export interface Lesson {
  id: string;
  title: string;
  description: string;
  theory: string[];
  codeExamples: { title: string; language: string; code: string }[];
  practice: {
    task: string;
    hint: string;
    solution: string;
  }[];
  keyPoints: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const courseModules: Module[] = [
  {
    id: "module-1",
    title: "Введение в CI/CD и Jenkins",
    description: "Основы непрерывной интеграции и доставки. Что такое Jenkins и зачем он нужен.",
    icon: "🚀",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Что такое CI/CD?",
        description: "Концепции непрерывной интеграции, доставки и развёртывания",
        theory: [
          "CI/CD — это набор практик, позволяющих командам разработки чаще и надёжнее доставлять программное обеспечение. CI/CD расшифровывается как Continuous Integration / Continuous Delivery (или Continuous Deployment).",
          "Continuous Integration (CI) — практика автоматического слияния изменений всех разработчиков в единую основную ветку несколько раз в день. После каждого слияния автоматически запускается сборка и тестирование.",
          "Continuous Delivery (CD) — расширение CI, при котором изменения автоматически собираются, тестируются и подготавливаются к развёртыванию в продакшн. Развёртывание происходит по нажатию кнопки.",
          "Continuous Deployment (CD) — следующий уровень, при котором каждое изменение, прошедшее все этапы пайплайна, автоматически развёртывается в продакшн без ручного вмешательства.",
          "Преимущества CI/CD: быстрая обратная связь, раннее обнаружение ошибок, автоматизация рутинных задач, возможность частых релизов, снижение рисков при развёртывании.",
          "Jenkins — это один из самых популярных open-source серверов автоматизации, который помогает автоматизировать рутинные задачи, связанные с разработкой ПО: сборку, тестирование и развёртывание."
        ],
        codeExamples: [
          {
            title: "Типичный CI/CD пайплайн",
            language: "text",
            code: `┌─────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌──────────┐
│  Code   │───▶│  Build  │───▶│   Test   │───▶│ Deploy  │───▶│ Monitor  │
│  Commit │    │ Compile │    │ Unit/E2E │    │ Staging │    │  & Log   │
└─────────┘    └─────────┘    └──────────┘    └─────────┘    └──────────┘
     │              │               │               │              │
     ▼              ▼               ▼               ▼              ▼
  Git Push     mvn/gradle     JUnit/Selenium   Docker/K8s    Prometheus
  Webhook      npm build      SonarQube        Ansible       Grafana`
          }
        ],
        practice: [
          {
            task: "Опишите своими словами разницу между Continuous Delivery и Continuous Deployment. Какие преимущества даёт каждый подход?",
            hint: "Подумайте о том, требуется ли ручное вмешательство перед развёртыванием в продакшн.",
            solution: "Continuous Delivery — код всегда готов к развёртыванию, но финальное решение принимает человек (нажатие кнопки). Continuous Deployment — код автоматически развёртывается в продакшн после прохождения всех тестов, без участия человека. CDelivery даёт контроль над релизами, CDeployment — максимальную скорость доставки."
          }
        ],
        keyPoints: [
          "CI — автоматическая сборка и тестирование при каждом изменении",
          "CD (Delivery) — автоматическая подготовка к релизу",
          "CD (Deployment) — автоматическое развёртывание в продакшн",
          "Jenkins — инструмент для автоматизации CI/CD пайплайнов"
        ]
      },
      {
        id: "lesson-1-2",
        title: "Архитектура Jenkins",
        description: "Как устроен Jenkins: контроллер, агенты, плагины",
        theory: [
          "Jenkins имеет клиент-серверную архитектуру. Основной компонент — Jenkins Controller (ранее назывался Master), который управляет всеми задачами, хранит конфигурации и координирует выполнение пайплайнов.",
          "Jenkins Agent (ранее Slave) — это отдельная машина или контейнер, который выполняет задачи по указанию контроллера. Агенты позволяют распределить нагрузку и выполнять сборки на разных платформах.",
          "Плагины — это расширения Jenkins, которые добавляют поддержку различных инструментов, систем контроля версий, облачных провайдеров и т.д. В экосистеме Jenkins более 1800 плагинов.",
          "Workspace — рабочая директория на агенте, где происходит выполнение задач. Каждая сборка получает своё workspace.",
          "Jenkins хранит все данные (конфигурации, историю сборок, логи) в файловой системе в формате XML. Это позволяет легко делать бэкапы, но требует аккуратности при масштабировании.",
          "Queue — очередь заданий. Когда пайплайн запускается, он попадает в очередь и ожидает свободного исполнителя (executor) на подходящем агенте."
        ],
        codeExamples: [
          {
            title: "Архитектура Jenkins",
            language: "text",
            code: `                    ┌─────────────────────────────┐
                    │     Jenkins Controller      │
                    │  ┌───────────────────────┐  │
                    │  │   Web UI (Port 8080)  │  │
                    │  ├───────────────────────┤  │
                    │  │   Job Configurations  │  │
                    │  ├───────────────────────┤  │
                    │  │   Build Queue         │  │
                    │  ├───────────────────────┤  │
                    │  │   Plugin Registry     │  │
                    │  └───────────────────────┘  │
                    └──────────┬──────────────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
    ┌─────────▼───┐  ┌────────▼────┐  ┌───────▼─────┐
    │   Agent 1   │  │   Agent 2   │  │   Agent 3   │
    │  (Linux)    │  │  (Windows)  │  │  (Docker)   │
    │  ┌───────┐  │  │  ┌───────┐  │  │  ┌───────┐  │
    │  │Workspace│ │  │  │Workspace│ │  │  │Workspace│ │
    │  └───────┘  │  │  └───────┘  │  │  └───────┘  │
    └─────────────┘  └─────────────┘  └─────────────┘`
          }
        ],
        practice: [
          {
            task: "Зачем нужны Jenkins агенты? Приведите 3 сценария, когда использование агентов критически важно.",
            hint: "Подумайте о разных ОС, нагрузке и безопасности.",
            solution: "1) Сборка для разных платформ (Windows, Linux, macOS) — каждая на своём агенте. 2) Распределение нагрузки — тяжёлые сборки не блокируют контроллер. 3) Изоляция — агенты в Docker-контейнерах обеспечивают чистое окружение для каждой сборки. 4) Безопасность — агенты в изолированной сети для работы с продакшн-секретами."
          }
        ],
        keyPoints: [
          "Controller управляет пайплайнами и хранит конфигурации",
          "Agents выполняют задачи на разных машинах",
          "Плагины расширяют функциональность Jenkins",
          "Workspace — рабочая директория для каждой сборки",
          "Queue — очередь заданий, ожидающих выполнения"
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Установка и настройка Jenkins",
    description: "Установка Jenkins, первичная настройка и конфигурация",
    icon: "⚙️",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Установка Jenkins",
        description: "Различные способы установки Jenkins",
        theory: [
          "Jenkins можно установить несколькими способами: через пакетный менеджер (apt/yum), через Docker, через WAR-файл или через готовые образы для облачных платформ. Для обучения и разработки рекомендуется Docker.",
          "Минимальные требования: Java 11 или 17 (для новых версий), 256 MB RAM (рекомендуется 1 GB+), 1 GB свободного места на диске.",
          "При первом запуске Jenkins запрашивает начальный пароль администратора, который находится в файле /var/lib/jenkins/secrets/initialAdminPassword (или в логах при запуске через Docker).",
          "После ввода пароля предлагается установить рекомендуемые плагины или выбрать вручную. Для начала рекомендуется выбрать рекомендуемый набор.",
          "После установки плагинов создаётся первый пользователь-администратор и настраивается URL Jenkins.",
          "Docker — самый удобный способ для разработки: быстрое развёртывание, изоляция, легкость обновления и удаления."
        ],
        codeExamples: [
          {
            title: "Установка Jenkins через Docker",
            language: "bash",
            code: `# Запуск Jenkins в Docker
docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\
  -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts

# Получение начального пароля
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# Jenkins с Docker-in-Docker (для сборки Docker образов)
docker run -d \\
  --name jenkins-docker \\
  --privileged \\
  -p 3000:3000 \\
  -p 2376:2376 \\
  -e DOCKER_TLS_CERTDIR=/certs \\
  -v jenkins-docker-certs:/certs/client \\
  -v jenkins-data:/var/jenkins_home \\
  docker:dind

docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\
  -p 50000:50000 \\
  -e DOCKER_HOST=tcp://jenkins-docker:2376 \\
  -e DOCKER_CERT_PATH=/certs/client \\
  -e DOCKER_TLS_VERIFY=1 \\
  -v jenkins-data:/var/jenkins_home \\
  -v /certs/client:/certs/client:ro \\
  jenkins/jenkins:lts`
          },
          {
            title: "Установка Jenkins на Ubuntu/Debian",
            language: "bash",
            code: `# Добавление ключа и репозитория
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \\
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \\
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Установка
sudo apt-get update
sudo apt-get install jenkins

# Запуск и проверка статуса
sudo systemctl start jenkins
sudo systemctl status jenkins

# Получение начального пароля
sudo cat /var/lib/jenkins/secrets/initialAdminPassword`
          },
          {
            title: "Docker Compose для Jenkins",
            language: "yaml",
            code: `version: '3.8'
services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Djenkins.install.runSetupWizard=false
    restart: unless-stopped

volumes:
  jenkins_home:`
          }
        ],
        practice: [
          {
            task: "Запустите Jenkins через Docker и получите доступ к веб-интерфейсу. Какие порты используются и зачем?",
            hint: "Порт 8080 — для веб-интерфейса, порт 50000 — для связи с агентами.",
            solution: "Порт 8080 — веб-интерфейс Jenkins (HTTP). Порт 50000 — протокол JNLP для подключения агентов к контроллеру. После запуска откройте http://localhost:8080 и введите начальный пароль из docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword"
          }
        ],
        keyPoints: [
          "Docker — рекомендуемый способ для разработки",
          "Порт 8080 — веб-интерфейс, 50000 — агенты",
          "Начальный пароль хранится в secrets/initialAdminPassword",
          "Рекомендуется использовать том для persistence данных",
          "Java 11+ требуется для работы Jenkins"
        ]
      },
      {
        id: "lesson-2-2",
        title: "Первичная настройка",
        description: "Настройка плагинов, пользователей и глобальных параметров",
        theory: [
          "После первого входа в Jenkins необходимо установить плагины. Рекомендуемый набор включает: Git, Pipeline, Docker Pipeline, Credentials, Blue Ocean, Email Extension.",
          "Система прав доступа в Jenkins: по умолчанию все пользователи имеют полный доступ. Для продакшна рекомендуется настроить матрицу прав через плагин Role-Based Authorization Strategy.",
          "Credentials (учётные данные) — безопасное хранение паролей, SSH-ключей, API-токенов. Jenkins шифрует credentials и предоставляет их только во время выполнения задач.",
          "Global Tool Configuration — настройка путей к инструментам (JDK, Maven, Gradle, Node.js, Git). Jenkins может автоматически устанавливать инструменты при необходимости.",
          "System Configuration — настройка количества потоков (executors), URL Jenkins, email-уведомлений, прокси.",
          "Manage Jenkins → Configure System — основная страница настроек. Здесь настраивается большинство глобальных параметров."
        ],
        codeExamples: [
          {
            title: "Основные плагины для DevOps",
            language: "text",
            code: `Обязательные плагины для DevOps:

📦 Pipeline              — DSL для описания пайплайнов
📦 Git                   — интеграция с Git
📦 Docker Pipeline       — сборка Docker образов в пайплайне
📦 Credentials           — безопасное хранение секретов
📦 Blue Ocean            — современный UI для пайплайнов
📦 Email Extension       — расширенные email-уведомления
📦 Slack Notification    — уведомления в Slack
📦 Kubernetes            — динамические агенты в K8s
📦 Job DSL               — конфигурация как код (Jobs)
📦 Configuration as Code — конфигурация Jenkins как код

Установка через CLI:
jenkins-plugin-cli --plugins \\
  workflow-aggregator git docker-workflow \\
  credentials blueOcean email-ext kubernetes`
          },
          {
            title: "Jenkins Configuration as Code (JCasC)",
            language: "yaml",
            code: `# jenkins.yaml — конфигурация Jenkins как код
jenkins:
  systemMessage: "Jenkins configured automatically by JCasC"
  numExecutors: 0
  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "\${ADMIN_PASSWORD}"
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
            entries:
              - user: "admin"
          - name: "developer"
            permissions:
              - "Job/Build"
              - "Job/Read"
              - "Job/Workspace"
            entries:
              - group: "developers"

unclassified:
  gitLabConnection:
    connections:
      - name: "gitlab"
        serverUrl: "https://gitlab.example.com"
        apiTokenId: "gitlab-token"

tool:
  git:
    installations:
      - name: "Default"
        home: "git"`
          }
        ],
        practice: [
          {
            task: "Настройте Jenkins с помощью JCasC (Configuration as Code). Создайте конфигурацию с двумя ролями: admin и developer.",
            hint: "Используйте YAML-формат. Роли определяются в разделе authorizationStrategy.",
            solution: `jenkins:
  systemMessage: "DevOps Jenkins"
  numExecutors: 0
  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "\${ADMIN_PASSWORD}"
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
              - "Overall/Read"
            entries:
              - user: "admin"
          - name: "developer"
            permissions:
              - "Job/Build"
              - "Job/Read"
              - "Job/Cancel"
              - "Job/Workspace"
            entries:
              - group: "developers"`
          }
        ],
        keyPoints: [
          "JCasC позволяет управлять конфигурацией через YAML",
          "Credentials хранятся зашифрованными",
          "Role-Based Authorization — рекомендуемый способ управления правами",
          "Global Tool Configuration — автоматическая установка инструментов",
          "Плагины расширяют функциональность Jenkins"
        ]
      }
    ]
  },
  {
    id: "module-3",
    title: "Первый пайплайн",
    description: "Создание первого Jenkins Pipeline, основы синтаксиса",
    icon: "📝",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Создание Pipeline",
        description: "Declarative и Scripted Pipeline, первый Jenkinsfile",
        theory: [
          "Jenkins Pipeline — это набор инструкций для автоматизации процесса доставки ПО. Пайплайн описывается в файле Jenkinsfile с использованием Groovy-синтаксиса.",
          "Существует два синтаксиса Pipeline: Declarative (более структурированный, рекомендуемый) и Scripted (более гибкий, но сложный). Declarative Pipeline был введён позже и является рекомендуемым подходом.",
          "Основные блоки Declarative Pipeline: pipeline { }, agent { }, stages { }, stage('Name') { }, steps { }. Каждый stage представляет этап пайплайна (сборка, тест, деплой).",
          "agent определяет, где будет выполняться пайплайн. Варианты: any (любой доступный агент), none (без агента), label (конкретный агент), docker (в контейнере).",
          "steps — это команды, которые выполняются на каждом этапе. Основные директивы: sh (выполнение shell-команд), echo (вывод сообщения), script (вставка Scripted-блока).",
          "Jenkinsfile можно хранить в корне репозитория (Multibranch Pipeline) или создать прямо в Jenkins (Pipeline job). Первый подход предпочтительнее — Pipeline as Code."
        ],
        codeExamples: [
          {
            title: "Простой Declarative Pipeline",
            language: "groovy",
            code: `// Jenkinsfile — простой пайплайн
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'echo "Компиляция проекта"'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'echo "Запуск тестов"'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'echo "Развёртывание приложения"'
            }
        }
    }

    post {
        always {
            echo 'Пайплайн завершён!'
        }
        success {
            echo 'Пайплайн успешен!'
        }
        failure {
            echo 'Пайплайн провален!'
        }
    }
}`
          },
          {
            title: "Pipeline с переменными окружения",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        APP_NAME = 'my-application'
        VERSION = '1.0.0'
        DEPLOY_ENV = 'staging'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Проект: \${env.APP_NAME}"
                echo "Версия: \${env.VERSION}"
            }
        }
        stage('Build') {
            steps {
                sh """
                    echo "Сборка \${APP_NAME} v\${VERSION}"
                    # mvn clean package -DskipTests
                """
            }
        }
        stage('Test') {
            steps {
                sh """
                    echo "Запуск тестов для \${APP_NAME}"
                    # mvn test
                """
            }
        }
        stage('Deploy') {
            when {
                environment name: 'DEPLOY_ENV', value: 'staging'
            }
            steps {
                sh "echo 'Deploy to \${DEPLOY_ENV}'"
            }
        }
    }
}`
          },
          {
            title: "Pipeline с условиями и параллельными задачами",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Build & Lint') {
            parallel {
                stage('Build') {
                    steps {
                        sh 'echo "Building..."'
                    }
                }
                stage('Lint') {
                    steps {
                        sh 'echo "Linting..."'
                    }
                }
            }
        }
        stage('Test') {
            when {
                branch 'main'
            }
            steps {
                sh 'echo "Running tests on main branch"'
            }
        }
        stage('Deploy') {
            when {
                allOf {
                    branch 'main'
                    expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
                }
            }
            steps {
                sh 'echo "Deploying to production"'
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Jenkinsfile для Node.js проекта с этапами: Install dependencies, Lint, Test, Build. Добавьте post-блок с уведомлениями об успехе/неудаче.",
            hint: "Используйте sh 'npm install', sh 'npm run lint' и т.д. В post-блоке используйте success {} и failure {}.",
            solution: `pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            sh 'echo "Pipeline finished"'
            cleanWs()
        }
        success {
            sh 'echo "✅ Build successful!"'
        }
        failure {
            sh 'echo "❌ Build failed!"'
        }
    }
}`
          }
        ],
        keyPoints: [
          "Declarative Pipeline — рекомендуемый синтаксис",
          "pipeline { } — корневой блок",
          "agent — где выполнять (any, docker, label)",
          "stages/stage/steps — структура пайплайна",
          "environment { } — переменные окружения",
          "post { } — действия после завершения",
          "when { } — условия выполнения stage",
          "parallel { } — параллельное выполнение"
        ]
      },
      {
        id: "lesson-3-2",
        title: "Работа с Git в Jenkins",
        description: "Интеграция с Git, Multibranch Pipeline, webhooks",
        theory: [
          "Интеграция Jenkins с Git — основа CI/CD. Jenkins может автоматически отслеживать изменения в репозитории и запускать пайплайн при каждом коммите.",
          "Multibranch Pipeline — тип проекта, который автоматически создаёт пайплайн для каждой ветки в репозитории. Jenkins находит Jenkinsfile в каждой ветке и создаёт соответствующий пайплайн.",
          "Webhook — механизм, при котором Git-сервер (GitHub, GitLab) уведомляет Jenkins о новых коммитах. Это позволяет запускать сборки мгновенно, без опроса репозитория.",
          "Branch Source — плагин, позволяющий Jenkins подключаться к GitHub/GitLab/Bitbucket и автоматически обнаруживать репозитории и ветки.",
          "SCM (Source Code Management) — общий термин для систем контроля версий. В Jenkins директива checkout scm автоматически использует настройки, указанные в конфигурации проекта.",
          "Credentials для Git: Jenkins хранит учётные данные (username/password, SSH-ключи, API-токены) в зашифрованном виде и подставляет их при клонировании репозитория."
        ],
        codeExamples: [
          {
            title: "Настройка webhook для GitHub",
            language: "text",
            code: `Настройка GitHub Webhook:

1. GitHub Repository → Settings → Webhooks → Add webhook

2. Параметры:
   Payload URL: http://your-jenkins:8080/github-webhook/
   Content type: application/json
   Secret: (оставьте пустым или укажите)
   Events: Just the push event

3. В Jenkins:
   - Создайте Multibranch Pipeline
   - Branch Sources → Add source → GitHub
   - Укажите репозиторий
   - Укажите credentials (GitHub token)
   
4. Для проверки webhook:
   GitHub → Settings → Webhooks → выберите webhook
   Должен быть зелёный чекмарк ✓`
          },
          {
            title: "Jenkinsfile с Git operations",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                // Или явное указание:
                // git branch: 'main',
                //     url: 'https://github.com/org/repo.git',
                //     credentialsId: 'github-token'
            }
        }
        stage('Get Changes') {
            steps {
                script {
                    def changeLog = sh(
                        script: 'git log --oneline -5',
                        returnStdout: true
                    ).trim()
                    echo "Последние изменения:\\n\${changeLog}"
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
    }
}`
          },
          {
            title: "Jenkinsfile для Multibranch с разными ветками",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        BRANCH_NAME = env.BRANCH_NAME ?: 'unknown'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy to Staging') {
            when {
                expression { env.BRANCH_NAME == 'develop' }
            }
            steps {
                sh './deploy.sh staging'
            }
        }
        stage('Deploy to Production') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                input message: 'Deploy to production?'
                sh './deploy.sh production'
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Jenkinsfile, который по-разному работает для веток: develop (деплой на staging), main (деплой на production с подтверждением), feature/* (только сборка и тесты).",
            hint: "Используйте when { expression { } } для проверки BRANCH_NAME и input для подтверждения.",
            solution: `pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm ci'
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy Staging') {
            when {
                expression { env.BRANCH_NAME == 'develop' }
            }
            steps {
                echo 'Deploying to staging...'
                sh './deploy.sh staging'
            }
        }
        stage('Deploy Production') {
            when {
                expression { env.BRANCH_NAME == 'main' }
            }
            steps {
                input message: 'Подтвердите деплой в production', ok: 'Deploy'
                sh './deploy.sh production'
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Multibranch Pipeline — автоматические пайплайны для каждой ветки",
          "Webhook — мгновенный запуск при push",
          "checkout scm — автоматическое клонирование репозитория",
          "env.BRANCH_NAME — текущая ветка",
          "when { } — условное выполнение stages",
          "input — ручное подтверждение перед действием"
        ]
      }
    ]
  },
  {
    id: "module-4",
    title: "Docker и Jenkins",
    description: "Сборка Docker образов, Docker-in-Docker, Docker Pipeline",
    icon: "🐳",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Docker Pipeline",
        description: "Сборка Docker образов в Jenkins, Docker agents",
        theory: [
          "Docker Pipeline плагин позволяет собирать Docker-образы и запускать контейнеры прямо в Jenkins Pipeline. Это основа современного CI/CD — каждый билд происходит в изолированном окружении.",
          "docker.build() — директива для сборки Docker-образа. docker.image().inside() — запуск команд внутри контейнера. docker.image().push() — публикация образа в реестр.",
          "Docker agent — запуск всего пайплайна или отдельного stage внутри Docker-контейнера. Это обеспечивает чистое окружение для каждой сборки.",
          "Docker-in-Docker (DinD) vs Docker-outside-Docker (DooD): DinD запускает Docker внутри Docker (более изолированно), DooD монтирует сокет хостового Docker (проще, но менее безопасно).",
          "Docker Registry — хранилище образов (Docker Hub, AWS ECR, Google GCR, Harbor). Jenkins должен иметь credentials для пуша образов.",
          "Best practice: использовать multi-stage builds в Dockerfile для уменьшения размера финального образа и разделения зависимостей сборки от runtime."
        ],
        codeExamples: [
          {
            title: "Pipeline с Docker агентом",
            language: "groovy",
            code: `// Пайплайн с Docker-агентом
pipeline {
    agent {
        docker {
            image 'node:18-alpine'
            label 'docker'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}

// Разные Docker-образы для разных stages
pipeline {
    agent none

    stages {
        stage('Build') {
            agent { docker { image 'maven:3.9-eclipse-temurin-17' } }
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            agent { docker { image 'maven:3.9-eclipse-temurin-17' } }
            steps {
                sh 'mvn test'
            }
        }
        stage('Docker Build & Push') {
            agent { docker { image 'docker:24-dind' } }
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
                        def app = docker.build("myapp:\${env.BUILD_NUMBER}")
                        app.push()
                        app.push('latest')
                    }
                }
            }
        }
    }
}`
          },
          {
            title: "Сборка и пуш Docker образа",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        REGISTRY = 'registry.example.com'
        IMAGE_NAME = 'myapp'
        DOCKER_CREDENTIALS = 'docker-registry-creds'
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build(
                        "\${REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}",
                        "--build-arg VERSION=\${env.BUILD_NUMBER} ."
                    )
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://\${REGISTRY}", "\${DOCKER_CREDENTIALS}") {
                        def builtImage = docker.image(
                            "\${REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}"
                        )
                        builtImage.push()
                        builtImage.push('latest')
                    }
                }
            }
        }
        stage('Cleanup') {
            steps {
                sh "docker rmi \${REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER} || true"
            }
        }
    }
}`
          },
          {
            title: "Dockerfile для Node.js приложения",
            language: "dockerfile",
            code: `# Multi-stage build
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS production
WORKDIR /app
RUN addgroup -g 1001 -S appgroup && \\
    adduser -S appuser -u 1001 -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline, который: 1) Собирает Docker-образ с тегом из номера сборки, 2) Сканирует образ на уязвимости (trivy), 3) Пушит образ в registry, если сканирование пройдено.",
            hint: "Используйте sh 'trivy image' для сканирования и when { } для условного пуша.",
            solution: `pipeline {
    agent any

    environment {
        REGISTRY = 'registry.example.com'
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = "\${env.BUILD_NUMBER}"
    }

    stages {
        stage('Build Image') {
            steps {
                script {
                    docker.build(
                        "\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}"
                    )
                }
            }
        }
        stage('Security Scan') {
            steps {
                sh """
                    trivy image \\
                        --severity HIGH,CRITICAL \\
                        --exit-code 1 \\
                        \${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}
                """
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://\${REGISTRY}", 'registry-creds') {
                        def img = docker.image("\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}")
                        img.push()
                        img.push('latest')
                    }
                }
            }
        }
    }

    post {
        always {
            sh "docker rmi \${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} || true"
        }
    }
}`
          }
        ],
        keyPoints: [
          "Docker agent — изолированное окружение для сборки",
          "docker.build() — сборка образа",
          "docker.withRegistry() — авторизация в реестре",
          "Multi-stage builds — уменьшение размера образа",
          "Безопасность: сканирование образов перед пушем",
          "DinD vs DooD — выбор подхода"
        ]
      }
    ]
  },
  {
    id: "module-5",
    title: "Продвинутые пайплайны",
    description: "Shared Libraries, параллельное выполнение, матричные сборки",
    icon: "🔧",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Shared Libraries",
        description: "Переиспользование кода между пайплайнами",
        theory: [
          "Shared Libraries — механизм переиспользования Groovy-кода между различными пайплайнами. Позволяет вынести общие функции, stages и логику в отдельный репозиторий.",
          "Структура Shared Library: vars/ (глобальные переменные и функции), src/ (Groovy-классы), resources/ (шаблоны, конфиги). Каждая папка имеет своё назначение.",
          "Подключение библиотеки: глобально (Manage Jenkins → System → Global Pipeline Libraries) или локально (@Library('my-lib') в начале Jenkinsfile).",
          "Custom Steps — пользовательские шаги, определённые в vars/. Например, vars/buildApp.groovy определяет функцию buildApp(), которую можно вызвать в любом пайплайне.",
          "Версионирование: можно указать конкретную версию (тег/ветку) библиотеки. Это обеспечивает стабильность — пайплайны не ломаются при обновлении библиотеки.",
          "Best practices: документировать все функции, использовать семантическое версионирование, писать тесты для библиотечного кода, использовать default version для стабильности."
        ],
        codeExamples: [
          {
            title: "Структура Shared Library",
            language: "text",
            code: `my-shared-library/
├── vars/
│   ├── buildApp.groovy          // def call(Map config) { ... }
│   ├── deployToK8s.groovy       // def call(Map config) { ... }
│   ├── notifySlack.groovy       // def call(String message) { ... }
│   └── standardPipeline.groovy  // def call(Map config) { ... }
├── src/
│   └── com/
│       └── company/
│           ├── Utils.groovy     // class Utils { ... }
│           └── Deployer.groovy  // class Deployer { ... }
├── resources/
│   ├── deploy-template.yaml     // Kubernetes manifest template
│   └── config/
│       └── default-settings.json
└── README.md`
          },
          {
            title: "Пример custom step (vars/buildApp.groovy)",
            language: "groovy",
            code: `// vars/buildApp.groovy
def call(Map config) {
    def language = config.language ?: 'node'
    def dockerImage = config.dockerImage ?: ''
    def registry = config.registry ?: 'docker.io'

    stage('Build') {
        switch(language) {
            case 'node':
                sh 'npm ci'
                sh 'npm run build'
                break
            case 'java':
                sh 'mvn clean package -DskipTests'
                break
            case 'python':
                sh 'pip install -r requirements.txt'
                break
        }
    }

    if (dockerImage) {
        stage('Docker Build') {
            script {
                docker.build(
                    "\${registry}/\${dockerImage}:\${env.BUILD_NUMBER}"
                )
            }
        }
    }
}`
          },
          {
            title: "Использование Shared Library в Jenkinsfile",
            language: "groovy",
            code: `// Подключение библиотеки
@Library('my-shared-library@v1.2.0') _

// Использование custom steps
pipeline {
    agent any

    stages {
        stage('Build App') {
            steps {
                buildApp(
                    language: 'node',
                    dockerImage: 'my-app',
                    registry: 'registry.example.com'
                )
            }
        }
        stage('Deploy') {
            steps {
                deployToK8s(
                    namespace: 'production',
                    image: "registry.example.com/my-app:\${env.BUILD_NUMBER}",
                    replicas: 3
                )
            }
        }
    }

    post {
        failure {
            notifySlack("❌ Build failed: \${env.JOB_NAME} #\${env.BUILD_NUMBER}")
        }
        success {
            notifySlack("✅ Build succeeded: \${env.JOB_NAME}")
        }
    }
}

// Или использование полного пайплайна из библиотеки
standardPipeline(
    language: 'node',
    dockerImage: 'my-app',
    deployEnvs: ['staging', 'production'],
    slackChannel: '#deployments'
)`
          }
        ],
        practice: [
          {
            task: "Создайте Shared Library функцию notifySlack.groovy, которая отправляет уведомления в Slack с цветовой индикацией (зелёный для успеха, красный для ошибки) и включает информацию о сборке.",
            hint: "Используйте httpRequest или curl для отправки в Slack webhook. Передавайте color и message.",
            solution: `// vars/notifySlack.groovy
def call(Map config = [:]) {
    def webhookUrl = config.webhookUrl ?: env.SLACK_WEBHOOK_URL
    def channel = config.channel ?: '#ci-cd'
    def status = config.status ?: (currentBuild.result ?: 'SUCCESS')
    def jobName = env.JOB_NAME
    def buildNumber = env.BUILD_NUMBER
    def buildUrl = env.BUILD_URL

    def color = status == 'SUCCESS' ? '#36a64f' : '#ff0000'
    def emoji = status == 'SUCCESS' ? '✅' : '❌'

    def payload = """
    {
        "channel": "\${channel}",
        "attachments": [{
            "color": "\${color}",
            "title": "\${emoji} \${jobName} #\${buildNumber}",
            "text": "Status: \${status}",
            "fields": [
                {"title": "Branch", "value": "\${env.BRANCH_NAME ?: 'N/A'}", "short": true},
                {"title": "Duration", "value": "\${currentBuild.durationString}", "short": true}
            ],
            "actions": [{
                "type": "button",
                "text": "View Build",
                "url": "\${buildUrl}"
            }]
        }]
    }
    """

    sh """
        curl -s -X POST -H 'Content-type: application/json' \\
            --data '\${payload}' \\
            \${webhookUrl}
    """
}`
          }
        ],
        keyPoints: [
          "Shared Libraries — переиспользование кода",
          "vars/ — глобальные функции (custom steps)",
          "src/ — Groovy-классы",
          "@Library('name@version') — подключение",
          "Версионирование обеспечивает стабильность",
          "Позволяет стандартизировать пайплайны в организации"
        ]
      },
      {
        id: "lesson-5-2",
        title: "Матричные сборки и параллелизм",
        description: "Matrix builds, параллельное выполнение, оптимизация",
        theory: [
          "Matrix builds — запуск одного и того же пайплайна с разными параметрами (разные версии языка, ОС, браузеры). Jenkins автоматически создаёт комбинации и запускает их параллельно.",
          "Parallel stages — выполнение нескольких stages одновременно. Ускоряет пайплайн, если задачи независимы друг от друга.",
          "failFast — опция, при которой при падении одной параллельной задачи все остальные отменяются. Полезно для экономии ресурсов.",
          "Throttle Concurrent Builds — плагин для ограничения количества одновременных сборок. Полезно для предотвращения перегрузки системы.",
          "Lockable Resources — плагин для блокировки ресурсов (например, среда для тестирования). Пайплайн ждёт, пока ресурс освободится.",
          "Timeout — ограничение времени выполнения stage или всего пайплайна. Предотвращает зависание сборок."
        ],
        codeExamples: [
          {
            title: "Matrix Pipeline",
            language: "groovy",
            code: `pipeline {
    agent none

    stages {
        stage('Matrix Build') {
            matrix {
                axes {
                    axis {
                        name: 'NODE_VERSION'
                        values: '16', '18', '20'
                    }
                    axis {
                        name: 'OS'
                        values: 'ubuntu', 'alpine'
                    }
                }
                stages {
                    stage('Build & Test') {
                        agent {
                            docker {
                                image "node:\${NODE_VERSION}-\${OS}"
                            }
                        }
                        steps {
                            echo "Testing on Node \${NODE_VERSION} / \${OS}"
                            sh 'npm ci'
                            sh 'npm test'
                        }
                    }
                }
            }
        }
    }
}`
          },
          {
            title: "Параллельные stages с failFast",
            language: "groovy",
            code: `pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Parallel Tests') {
            failFast true
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'npm run test:unit'
                    }
                    post {
                        always {
                            junit 'test-results/unit/*.xml'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'npm run test:integration'
                    }
                    post {
                        always {
                            junit 'test-results/integration/*.xml'
                        }
                    }
                }
                stage('E2E Tests') {
                    steps {
                        sh 'npm run test:e2e'
                    }
                    post {
                        always {
                            junit 'test-results/e2e/*.xml'
                        }
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'npm audit --audit-level=high'
                    }
                }
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Matrix Pipeline для тестирования Java-приложения на разных версиях JDK (11, 17, 21) и разных базах данных (PostgreSQL, MySQL). Добавьте failFast и таймаут.",
            hint: "Используйте matrix { axes { axis { } } } и options { timeout() }.",
            solution: `pipeline {
    agent none

    options {
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Test Matrix') {
            failFast true
            matrix {
                axes {
                    axis {
                        name: 'JDK_VERSION'
                        values: '11', '17', '21'
                    }
                    axis {
                        name: 'DATABASE'
                        values: 'postgresql', 'mysql'
                    }
                }
                stages {
                    stage('Test') {
                        agent {
                            docker {
                                image "eclipse-temurin:\${JDK_VERSION}-jdk"
                            }
                        }
                        environment {
                            DB_TYPE = "\${DATABASE}"
                        }
                        steps {
                            echo "Testing with JDK \${JDK_VERSION} + \${DATABASE}"
                            sh './gradlew test -Ddb.type=\${DATABASE}'
                        }
                        post {
                            always {
                                junit 'build/test-results/**/*.xml'
                            }
                        }
                    }
                }
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Matrix builds — тестирование на комбинациях параметров",
          "Parallel stages — ускорение независимых задач",
          "failFast — отмена остальных при падении",
          "timeout — защита от зависания",
          "Экономия времени за счёт параллелизма"
        ]
      }
    ]
  },
  {
    id: "module-6",
    title: "Kubernetes и Jenkins",
    description: "Jenkins на Kubernetes, динамические агенты, деплой в K8s",
    icon: "☸️",
    lessons: [
      {
        id: "lesson-6-1",
        title: "Jenkins на Kubernetes",
        description: "Развёртывание Jenkins в K8s, динамические агенты",
        theory: [
          "Jenkins можно развернуть в Kubernetes как набор подов. Контроллер работает как Deployment, а агенты создаются динамически как отдельные поды по требованию.",
          "Kubernetes plugin для Jenkins позволяет создавать динамические агенты. Каждый пайплайн получает свой собственный под с нужными инструментами, который удаляется после завершения.",
          "Преимущества Jenkins на K8s: автоматическое масштабирование, отказоустойчивость, эффективное использование ресурсов, изоляция сборок, простота обновления.",
          "Helm chart — рекомендуемый способ установки Jenkins в K8s. Позволяет управлять конфигурацией через values.yaml и легко обновлять версии.",
          "Persistence: Jenkins Home хранится в Persistent Volume Claim (PVC). Это обеспечивает сохранность данных при перезапуске подов.",
          "RBAC (Role-Based Access Control): Jenkins-сервисаккаунт должен иметь нужные права для создания подов-агентов и доступа к API Kubernetes."
        ],
        codeExamples: [
          {
            title: "Helm values для Jenkins",
            language: "yaml",
            code: `# values.yaml для Jenkins Helm chart
controller:
  image:
    repository: jenkins/jenkins
    tag: lts
  resources:
    requests:
      cpu: "500m"
      memory: "1Gi"
    limits:
      cpu: "2000m"
      memory: "4Gi"
  persistence:
    enabled: true
    size: "20Gi"
    storageClass: "standard"
  installPlugins:
    - kubernetes:latest
    - workflow-aggregator:latest
    - git:latest
    - configuration-as-code:latest
    - docker-workflow:latest
  JCasC:
    configScripts:
      welcome-message: |
        jenkins:
          systemMessage: "Jenkins on Kubernetes - Managed by Helm"
      kubernetes-agent: |
        jenkins:
          clouds:
            - kubernetes:
                name: "kubernetes"
                namespace: "jenkins"
                jenkinsUrl: "http://jenkins.jenkins.svc.cluster.local:8080"
                templates:
                  - name: "default-agent"
                    label: "jenkins-agent"
                    containers:
                      - name: "jnlp"
                        image: "jenkins/inbound-agent:latest"
                        resourceRequestCpu: "500m"
                        resourceLimitCpu: "1000m"
                        resourceRequestMemory: "1Gi"
                        resourceLimitMemory: "2Gi"
                      - name: "docker"
                        image: "docker:24-dind"
                        privileged: true

agent:
  enabled: true
  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1Gi"`
          },
          {
            title: "Pipeline с Kubernetes agent",
            language: "groovy",
            code: `pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: docker
      image: docker:24-dind
      securityContext:
        privileged: true
      env:
        - name: DOCKER_TLS_CERTDIR
          value: ""
    - name: kubectl
      image: bitnami/kubectl:latest
      command: ['sleep', 'infinity']
    - name: helm
      image: alpine/helm:latest
      command: ['sleep', 'infinity']
  volumes:
    - name: docker-sock
      emptyDir: {}
"""
        }
    }

    stages {
        stage('Build') {
            steps {
                container('docker') {
                    sh 'docker build -t myapp:\${BUILD_NUMBER} .'
                }
            }
        }
        stage('Deploy to K8s') {
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install myapp ./charts/myapp \\
                            --namespace production \\
                            --set image.tag=\${BUILD_NUMBER} \\
                            --wait --timeout 5m
                    """
                }
            }
        }
        stage('Verify Deployment') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl rollout status deployment/myapp \\
                            -n production --timeout=300s
                        kubectl get pods -n production -l app=myapp
                    """
                }
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для деплоя в Kubernetes с использованием Helm. Включите: сборку Docker-образа, push в registry, helm upgrade, проверку rollout и rollback при неудаче.",
            hint: "Используйте helm upgrade --install, kubectl rollout status и helm rollback.",
            solution: `pipeline {
    agent {
        kubernetes {
            defaultContainer 'jnlp'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
    - name: docker
      image: docker:24-dind
      securityContext:
        privileged: true
    - name: helm
      image: alpine/helm:3.13
      command: ['sleep', 'infinity']
    - name: kubectl
      image: bitnami/kubectl:latest
      command: ['sleep', 'infinity']
"""
        }
    }

    environment {
        APP_NAME = 'myapp'
        NAMESPACE = 'production'
        REGISTRY = 'registry.example.com'
        CHART_PATH = './charts/myapp'
    }

    stages {
        stage('Build & Push') {
            steps {
                container('docker') {
                    sh """
                        docker build -t \${REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER} .
                        docker push \${REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER}
                    """
                }
            }
        }
        stage('Deploy') {
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} \${CHART_PATH} \\
                            --namespace \${NAMESPACE} \\
                            --set image.repository=\${REGISTRY}/\${APP_NAME} \\
                            --set image.tag=\${BUILD_NUMBER} \\
                            --wait --timeout 5m \\
                            --atomic
                    """
                }
            }
        }
        stage('Verify') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl rollout status deployment/\${APP_NAME} \\
                            -n \${NAMESPACE} --timeout=300s
                        kubectl get pods -n \${NAMESPACE} -l app=\${APP_NAME}
                    """
                }
            }
        }
    }

    post {
        failure {
            container('helm') {
                sh """
                    echo "Deployment failed! Rolling back..."
                    helm rollback \${APP_NAME} --namespace \${NAMESPACE}
                """
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Helm — рекомендуемый способ установки Jenkins в K8s",
          "Динамические агенты — каждый билд в своём поде",
          "Multi-container pods — разные инструменты в одном поде",
          "PVC для persistence данных Jenkins",
          "Helm для деплоя приложений в K8s",
          "Rollback при неудачном деплое"
        ]
      }
    ]
  },
  {
    id: "module-7",
    title: "Безопасность и мониторинг",
    description: "SecOps, управление секретами, мониторинг Jenkins",
    icon: "🔒",
    lessons: [
      {
        id: "lesson-7-1",
        title: "Безопасность Jenkins",
        description: "Credentials, секреты, безопасность пайплайнов",
        theory: [
          "Безопасность Jenkins включает: аутентификацию пользователей, авторизацию (права доступа), управление секретами, защиту от инъекций, аудит действий.",
          "Credentials — безопасное хранение секретов (пароли, токены, SSH-ключи, сертификаты). Jenkins шифрует их AES-128 и хранит в credentials.xml.",
          "withCredentials() — директива для безопасного использования credentials в пайплайне. Секреты маскируются в логах и доступны только во время выполнения.",
          "HashiCorp Vault / AWS Secrets Manager — внешние хранилища секретов. Jenkins может получать секреты из них через плагины, что более безопасно чем встроенное хранилище.",
          "Script Security — пайплайны проходят проверку безопасности. Операторы, которые могут быть опасными (например, выполнение произвольного кода), требуют одобрения администратора.",
          "Audit Trail — плагин для логирования всех действий в Jenkins. Критически важен для compliance и расследования инцидентов."
        ],
        codeExamples: [
          {
            title: "Безопасное использование credentials",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        // Credentials подставляются автоматически
        DB_PASSWORD = credentials('db-password-id')
        DOCKER_CREDS = credentials('docker-registry-creds')
    }

    stages {
        stage('Deploy') {
            steps {
                // withCredentials для более гибкого использования
                withCredentials([
                    usernamePassword(
                        credentialsId: 'deploy-creds',
                        usernameVariable: 'DEPLOY_USER',
                        passwordVariable: 'DEPLOY_PASS'
                    ),
                    sshUserPrivateKey(
                        credentialsId: 'ssh-key',
                        keyFileVariable: 'SSH_KEY_PATH'
                    ),
                    string(
                        credentialsId: 'api-token',
                        variable: 'API_TOKEN'
                    )
                ]) {
                    sh """
                        # Секреты доступны как переменные
                        # Но маскируются в логах (****)
                        curl -u "\${DEPLOY_USER}:\${DEPLOY_PASS}" \\
                            https://api.example.com/deploy
                        
                        ssh -i "\${SSH_KEY_PATH}" user@server \\
                            'deploy.sh'
                    """
                }
            }
        }
    }
}`
          },
          {
            title: "Интеграция с HashiCorp Vault",
            language: "groovy",
            code: `pipeline {
    agent any

    options {
        // Получение секретов из Vault
        vaultConfiguration(
            vaultUrl: 'https://vault.example.com',
            vaultCredentialId: 'vault-token'
        )
    }

    stages {
        stage('Deploy with Vault Secrets') {
            steps {
                withVault([
                    configuration: [
                        vaultUrl: 'https://vault.example.com',
                        vaultCredentialId: 'vault-token'
                    ],
                    vaultSecrets: [
                        [path: 'secret/data/myapp/prod',
                         secretValues: [
                             [envVar: 'DB_URL', vaultKey: 'db_url'],
                             [envVar: 'API_KEY', vaultKey: 'api_key']
                         ]]
                    ]
                ]) {
                    sh """
                        echo "Connecting to database..."
                        # \$DB_URL и \$API_KEY доступны здесь
                        # и замаскированы в логах
                        ./deploy-with-secrets.sh
                    """
                }
            }
        }
    }
}`
          },
          {
            title: "Безопасный Jenkinsfile — best practices",
            language: "groovy",
            code: `// ❌ ПЛОХО: хардкод секретов
pipeline {
    stages {
        stage('Deploy') {
            steps {
                sh 'curl -u admin:password123 https://api.example.com'
            }
        }
    }
}

// ✅ ХОРОШО: использование credentials
pipeline {
    environment {
        API_CREDS = credentials('api-credentials')
    }
    stages {
        stage('Deploy') {
            steps {
                sh 'curl -u "\${API_CREDS}" https://api.example.com'
            }
        }
    }
}

// ✅ ХОРОШО: валидация входных данных
pipeline {
    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Target environment'
        )
        string(
            name: 'VERSION',
            description: 'Version to deploy',
            trim: true
        )
    }
    stages {
        stage('Validate') {
            steps {
                script {
                    if (!params.VERSION?.matches(/^\\d+\\.\\d+\\.\\d+$/)) {
                        error "Invalid version format: \${params.VERSION}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "./deploy.sh \${params.ENVIRONMENT} \${params.VERSION}"
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline, который безопасно получает секреты из credentials, использует их для деплоя и гарантирует, что секреты не попадут в логи. Добавьте валидацию параметров.",
            hint: "Используйте withCredentials() для безопасного использования и params для валидации входных данных.",
            solution: `pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['staging', 'production'],
            description: 'Target environment'
        )
        string(
            name: 'VERSION',
            description: 'Version to deploy (semver)',
            trim: true
        )
    }

    stages {
        stage('Validate Parameters') {
            steps {
                script {
                    if (!params.VERSION?.matches(/^\\d+\\.\\d+\\.\\d+$/)) {
                        error "Invalid version: \${params.VERSION}. Use semver (x.y.z)"
                    }
                    if (params.ENVIRONMENT == 'production') {
                        input message: "Deploy \${params.VERSION} to PRODUCTION?",
                              ok: 'Yes, deploy'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "\${params.ENVIRONMENT}-deploy-creds",
                        usernameVariable: 'DEPLOY_USER',
                        passwordVariable: 'DEPLOY_PASS'
                    )
                ]) {
                    sh """
                        set +x  # Disable command echo
                        ./deploy.sh \\
                            --env \${params.ENVIRONMENT} \\
                            --version \${params.VERSION} \\
                            --user "\${DEPLOY_USER}" \\
                            --pass "\${DEPLOY_PASS}"
                    """
                }
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Никогда не хардкодите секреты в Jenkinsfile",
          "credentials() и withCredentials() — безопасное использование",
          "Vault/Secrets Manager — внешнее хранение секретов",
          "Валидация параметров предотвращает ошибки",
          "Audit Trail — логирование всех действий",
          "Script Security — контроль опасных операций"
        ]
      }
    ]
  },
  {
    id: "module-8",
    title: "DevOps Best Practices",
    description: "Полноценный CI/CD, GitOps, мониторинг, реальные сценарии",
    icon: "🏆",
    lessons: [
      {
        id: "lesson-8-1",
        title: "Полноценный CI/CD пайплайн",
        description: "Production-ready пайплайн от коммита до продакшна",
        theory: [
          "Production-ready пайплайн включает: линтинг, сборку, юнит-тесты, интеграционные тесты, security scan, сборку Docker-образа, деплой на staging, smoke-тесты, деплой на production, мониторинг.",
          "Git Flow / Trunk-Based Development — стратегии ветвления. Trunk-Based (короткоживущие ветки от main) лучше подходит для CI/CD, так как уменьшает конфликты и ускоряет интеграцию.",
          "Canary Deployment — развёртывание новой версии для небольшой части трафика. Позволяет обнаружить проблемы до полного переключения. Blue-Green — параллельные среды, мгновенное переключение.",
          "Infrastructure as Code (IaC) — управление инфраструктурой через код (Terraform, Ansible, Pulumi). Jenkins может выполнять IaC-скрипты для управления окружениями.",
          "Observability — мониторинг (Prometheus), логирование (ELK/Loki), трейсинг (Jaeger). Jenkins может интегрироваться с этими системами для отслеживания состояния после деплоя.",
          "Pipeline as Code — весь Jenkins настраивается через код (JCasC + Jenkinsfile + Shared Libraries). Это позволяет версионировать, ревьюить и тестировать конфигурацию CI/CD."
        ],
        codeExamples: [
          {
            title: "Production-ready CI/CD Pipeline",
            language: "groovy",
            code: `@Library('shared-pipeline@v2.0') _

pipeline {
    agent none

    options {
        timeout(time: 60, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        REGISTRY = 'registry.example.com'
        APP_NAME = 'my-service'
        HELM_CHART = './charts/my-service'
        SLACK_CHANNEL = '#deployments'
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['staging', 'production'])
        booleanParam(name: 'SKIP_TESTS', defaultValue: false)
    }

    stages {
        stage('Checkout') {
            agent { label 'docker' }
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    env.GIT_BRANCH = env.BRANCH_NAME
                }
            }
        }

        stage('Lint & Static Analysis') {
            agent { docker { image 'sonarsource/sonar-scanner-cli:latest' } }
            steps {
                sh 'sonar-scanner -Dsonar.projectKey=\${APP_NAME}'
            }
        }

        stage('Build & Unit Tests') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                sh 'npm ci'
                sh 'npm run lint'
                sh 'npm run test:unit -- --coverage'
                sh 'npm run build'
            }
            post {
                always {
                    junit 'test-results/unit/*.xml'
                    publishHTML([
                        reportName: 'Coverage',
                        reportDir: 'coverage/',
                        reportFiles: 'index.html'
                    ])
                }
            }
        }

        stage('Security') {
            parallel {
                stage('Dependency Scan') {
                    agent { docker { image 'aquasec/trivy:latest' } }
                    steps {
                        sh 'trivy fs --severity HIGH,CRITICAL --exit-code 1 .'
                    }
                }
                stage('Secret Scan') {
                    agent { docker { image 'zricethezav/gitleaks:latest' } }
                    steps {
                        sh 'gitleaks detect --source . --verbose'
                    }
                }
            }
        }

        stage('Docker Build & Push') {
            agent { label 'docker' }
            steps {
                script {
                    def imageTag = "\${REGISTRY}/\${APP_NAME}:\${env.GIT_COMMIT_SHORT}"
                    docker.build(imageTag, "--build-arg VERSION=\${env.GIT_COMMIT_SHORT} .")
                    docker.withRegistry("https://\${REGISTRY}", 'registry-creds') {
                        docker.image(imageTag).push()
                        docker.image(imageTag).push('latest')
                    }
                    // Scan Docker image
                    sh "trivy image --severity HIGH,CRITICAL \${imageTag}"
                }
            }
        }

        stage('Deploy to Staging') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                }
            }
            agent {
                kubernetes {
                    yamlFile 'k8s/jenkins-agent.yaml'
                }
            }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} \${HELM_CHART} \\
                            --namespace staging \\
                            --set image.tag=\${env.GIT_COMMIT_SHORT} \\
                            --set replicas=1 \\
                            --wait --timeout 5m --atomic
                    """
                }
            }
        }

        stage('Smoke Tests') {
            when { branch 'main' }
            agent { docker { image 'postman/newman:latest' } }
            steps {
                sh """
                    newman run tests/smoke-tests.json \\
                        --environment tests/staging-env.json \\
                        --reporters cli,junit
                """
            }
        }

        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'main'
                    expression { params.DEPLOY_ENV == 'production' }
                }
            }
            steps {
                input message: "Deploy \${env.GIT_COMMIT_SHORT} to production?",
                      ok: 'Deploy',
                      submitter: 'admin,tech-lead'
            }
            agent {
                kubernetes {
                    yamlFile 'k8s/jenkins-agent.yaml'
                }
            }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} \${HELM_CHART} \\
                            --namespace production \\
                            --set image.tag=\${env.GIT_COMMIT_SHORT} \\
                            --set replicas=3 \\
                            --set strategy.rollingUpdate.maxSurge=1 \\
                            --set strategy.rollingUpdate.maxUnavailable=0 \\
                            --wait --timeout 10m --atomic
                    """
                }
            }
        }

        stage('Post-Deploy Verification') {
            when { branch 'main' }
            steps {
                script {
                    // Wait for deployment to stabilize
                    sleep(time: 30, unit: 'SECONDS')
                    // Run health checks
                    sh """
                        for i in {1..5}; do
                            STATUS=\\\$(curl -s -o /dev/null -w '%{http_code}' \\
                                https://\${APP_NAME}.example.com/health)
                            if [ "\\\$STATUS" = "200" ]; then
                                echo "Health check passed!"
                                exit 0
                            fi
                            echo "Attempt \\\$i: status \\\$STATUS"
                            sleep 10
                        done
                        echo "Health check failed!"
                        exit 1
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            script {
                notifySlack(
                    channel: "\${SLACK_CHANNEL}",
                    status: 'SUCCESS',
                    message: "✅ \${APP_NAME} \${env.GIT_COMMIT_SHORT} deployed to \${params.DEPLOY_ENV}"
                )
            }
        }
        failure {
            script {
                notifySlack(
                    channel: "\${SLACK_CHANNEL}",
                    status: 'FAILURE',
                    message: "❌ \${APP_NAME} build failed at \${currentBuild.currentResult}"
                )
            }
        }
        unstable {
            script {
                notifySlack(
                    channel: "\${SLACK_CHANNEL}",
                    status: 'UNSTABLE',
                    message: "⚠️ \${APP_NAME} build unstable"
                )
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Спроектируйте полный CI/CD пайплайн для микросервиса. Определите этапы, стратегии тестирования, деплоя и отката. Напишите Jenkinsfile.",
            hint: "Включите: lint, build, test (unit + integration), security scan, docker build, deploy staging, smoke test, deploy production, monitoring.",
            solution: `// Полный CI/CD пайплайн для микросервиса
// Этапы:
// 1. Checkout + версионирование
// 2. Lint + Static Analysis (SonarQube)
// 3. Build + Unit Tests + Coverage
// 4. Security (dependency scan + secret scan + image scan)
// 5. Docker Build & Push
// 6. Deploy to Staging (Helm)
// 7. Integration Tests
// 8. Smoke Tests
// 9. Deploy to Production (canary → full rollout)
// 10. Post-deploy verification + monitoring
// 11. Notifications (Slack/Email)
// 12. Rollback (при failure)

pipeline {
    agent none
    options {
        timeout(time: 60, unit: 'MINUTES')
        disableConcurrentBuilds()
    }
    stages {
        stage('Checkout') {
            agent { label 'docker' }
            steps {
                checkout scm
                script {
                    env.COMMIT = sh(script:'git rev-parse --short HEAD', returnStdout:true).trim()
                }
            }
        }
        stage('Build & Test') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                sh 'npm ci && npm run lint && npm test && npm run build'
            }
        }
        stage('Docker') {
            agent { label 'docker' }
            steps {
                script {
                    docker.build("app:\${env.COMMIT}")
                    sh "trivy image app:\${env.COMMIT}"
                    docker.withRegistry('https://registry.example.com', 'creds') {
                        docker.image("app:\${env.COMMIT}").push()
                    }
                }
            }
        }
        stage('Deploy & Verify') {
            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }
            steps {
                container('helm') {
                    sh 'helm upgrade --install app ./chart --set image.tag=\${COMMIT} --atomic --wait'
                }
                container('kubectl') {
                    sh 'kubectl rollout status deployment/app --timeout=300s'
                }
            }
        }
    }
    post {
        failure { sh 'echo "ALERT: Build failed!"' }
        success { sh 'echo "SUCCESS: Deployed!"' }
    }
}`
          }
        ],
        keyPoints: [
          "Полный пайплайн: lint → test → security → build → deploy → verify",
          "Canary/Blue-Green деплой для безопасных релизов",
          "Автоматический rollback при проблемах",
          "Уведомления в Slack/Email",
          "Pipeline as Code — всё в Git",
          "Мониторинг после деплоя"
        ]
      },
      {
        id: "lesson-8-2",
        title: "GitOps и Jenkins",
        description: "GitOps подход, ArgoCD + Jenkins, declarative infrastructure",
        theory: [
          "GitOps — подход, при котором желаемое состояние инфраструктуры и приложений хранится в Git. Git является единственным источником истины (single source of truth).",
          "В GitOps-подходе Jenkins отвечает за CI (сборка, тесты, создание образов), а CD делегируется GitOps-инструментам (ArgoCD, Flux). Это разделение ответственности.",
          "ArgoCD — контроллер Kubernetes, который отслеживает Git-репозиторий и автоматически синхронизирует состояние кластера с описанным в Git.",
          "Jenkins + ArgoCD: Jenkins собирает образ и обновляет тег в Git-репозитории с манифестами. ArgoCD обнаруживает изменение и деплоит новую версию.",
          "Promotion Pipeline — пайплайн продвижения: staging → production. После успешного деплоя на staging, Jenkins создаёт PR в Git-репозиторий с обновлением production-манифестов.",
          "Преимущества GitOps: полный аудит через Git history, быстрый откат (git revert), согласованность окружений, безопасность (нет прямого доступа к кластеру)."
        ],
        codeExamples: [
          {
            title: "GitOps Pipeline с ArgoCD",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        APP_NAME = 'my-service'
        MANIFESTS_REPO = 'https://github.com/org/k8s-manifests.git'
        MANIFESTS_BRANCH = 'main'
    }

    stages {
        stage('CI: Build & Test') {
            steps {
                sh 'npm ci && npm test && npm run build'
                sh 'docker build -t registry.example.com/\${APP_NAME}:\${BUILD_NUMBER} .'
                sh 'docker push registry.example.com/\${APP_NAME}:\${BUILD_NUMBER}'
            }
        }

        stage('CD: Update Manifests') {
            steps {
                // Клонируем репозиторий с манифестами
                sshagent(['git-ssh-key']) {
                    sh """
                        git clone \${MANIFESTS_REPO} manifests-repo
                        cd manifests-repo
                        
                        # Обновляем тег образа
                        sed -i 's|tag:.*|tag: "\${BUILD_NUMBER}"|' \\
                            environments/staging/values.yaml
                        
                        # Создаём коммит и PR
                        git checkout -b update-\${APP_NAME}-\${BUILD_NUMBER}
                        git add .
                        git commit -m "chore: update \${APP_NAME} to \${BUILD_NUMBER}"
                        git push origin update-\${APP_NAME}-\${BUILD_NUMBER}
                        
                        # Создаём Pull Request (через GitHub CLI)
                        gh pr create \\
                            --title "Update \${APP_NAME} to \${BUILD_NUMBER}" \\
                            --body "Automated update by Jenkins" \\
                            --base main
                    """
                }
            }
        }

        stage('Wait for ArgoCD Sync') {
            steps {
                sh """
                    # Ожидаем синхронизацию ArgoCD
                    argocd app wait \${APP_NAME} \\
                        --timeout 300 \\
                        --health \\
                        --sync
                """
            }
        }
    }
}`
          },
          {
            title: "ArgoCD Application manifest",
            language: "yaml",
            code: `# ArgoCD Application для my-service
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-service
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/org/k8s-manifests.git
    targetRevision: main
    path: environments/production/my-service
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10`
          }
        ],
        practice: [
          {
            task: "Опишите архитектуру CI/CD с использованием Jenkins + ArgoCD. Как будет происходить промоушн от staging до production? Какие преимущества даёт такой подход?",
            hint: "Jenkins = CI (build, test, push image). ArgoCD = CD (sync manifests). Промоушн через PR в manifests repo.",
            solution: `Архитектура Jenkins + ArgoCD:

1. Developer pushes code → Jenkins triggers CI pipeline
2. Jenkins: lint → test → build Docker image → push to registry
3. Jenkins: updates image tag in k8s-manifests repo (creates PR)
4. PR reviewed & merged → ArgoCD detects change
5. ArgoCD syncs staging → smoke tests pass
6. Jenkins creates PR for production manifests update
7. Tech lead approves PR → ArgoCD syncs production
8. ArgoCD health checks verify deployment

Преимущества:
- Полный аудит через Git history
- Откат через git revert
- Разделение CI (Jenkins) и CD (ArgoCD)
- Нет прямого доступа к кластеру из Jenkins
- Self-healing: ArgoCD автоматически исправляет дрейф`
          }
        ],
        keyPoints: [
          "GitOps: Git — единственный источник истины",
          "Jenkins = CI, ArgoCD = CD",
          "Промоушн через Pull Requests",
          "ArgoCD автоматически синхронизирует кластер",
          "Полный аудит и быстрый откат",
          "Self-healing и drift detection"
        ]
      }
    ]
  }
];
