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
    description: "Основы непрерывной интеграции и доставки",
    icon: "🚀",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Что такое CI/CD?",
        description: "Концепции непрерывной интеграции, доставки и развёртывания",
        theory: [
          "CI/CD — это набор практик, позволяющих командам разработки чаще и надёжнее доставлять программное обеспечение.",
          "Continuous Integration (CI) — практика автоматического слияния изменений всех разработчиков в единую основную ветку несколько раз в день.",
          "Continuous Delivery (CD) — расширение CI, при котором изменения автоматически собираются, тестируются и подготавливаются к развёртыванию в продакшн.",
          "Continuous Deployment — каждый коммит, прошедший все этапы пайплайна, автоматически развёртывается в продакшн.",
          "Jenkins — один из самых популярных open-source серверов автоматизации для CI/CD."
        ],
        codeExamples: [
          {
            title: "Типичный CI/CD пайплайн",
            language: "text",
            code: "Code Commit → Build → Test → Deploy Staging → Deploy Production\n     │          │        │         │                │\n  Git Push   Compile   JUnit    Docker/K8s       Monitor\n  Webhook    npm/mvn   Selenium  Ansible        Prometheus"
          }
        ],
        practice: [
          {
            task: "Опишите разницу между Continuous Delivery и Continuous Deployment.",
            hint: "Подумайте о ручном вмешательстве перед развёртыванием.",
            solution: "Continuous Delivery — код готов к деплою, но решение принимает человек. Continuous Deployment — код автоматически развёртывается после прохождения всех тестов."
          }
        ],
        keyPoints: [
          "CI — автоматическая сборка и тестирование",
          "CD (Delivery) — подготовка к релизу",
          "CD (Deployment) — автоматический деплой",
          "Jenkins — инструмент для CI/CD"
        ]
      },
      {
        id: "lesson-1-2",
        title: "Архитектура Jenkins",
        description: "Controller, агенты, плагины",
        theory: [
          "Jenkins Controller управляет пайплайнами и хранит конфигурации.",
          "Jenkins Agent выполняет задачи на отдельных машинах.",
          "Плагины расширяют функциональность Jenkins (1800+ плагинов).",
          "Workspace — рабочая директория для каждой сборки.",
          "Queue — очередь заданий, ожидающих выполнения."
        ],
        codeExamples: [
          {
            title: "Архитектура Jenkins",
            language: "text",
            code: "    Jenkins Controller (Port 8080)\n         │         │         │\n    Agent 1    Agent 2    Agent 3\n   (Linux)   (Windows)  (Docker)"
          }
        ],
        practice: [
          {
            task: "Зачем нужны Jenkins агенты? Приведите 3 сценария.",
            hint: "Подумайте о разных ОС, нагрузке и безопасности.",
            solution: "1) Сборка для разных платформ. 2) Распределение нагрузки. 3) Изоляция в Docker-контейнерах."
          }
        ],
        keyPoints: [
          "Controller управляет пайплайнами",
          "Agents выполняют задачи",
          "Плагины расширяют функциональность",
          "Workspace — рабочая директория"
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Установка и настройка",
    description: "Установка Jenkins, первичная настройка",
    icon: "⚙️",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Установка Jenkins",
        description: "Docker, Ubuntu, WAR",
        theory: [
          "Jenkins можно установить через Docker, пакетный менеджер или WAR-файл.",
          "Минимальные требования: Java 11+, 256 MB RAM, 1 GB диска.",
          "При первом запуске нужен начальный пароль из secrets/initialAdminPassword.",
          "Docker — самый удобный способ для разработки."
        ],
        codeExamples: [
          {
            title: "Docker Compose для Jenkins",
            language: "yaml",
            code: "version: '3.8'\nservices:\n  jenkins:\n    image: jenkins/jenkins:lts\n    ports:\n      - \"8080:8080\"\n      - \"50000:50000\"\n    volumes:\n      - jenkins_home:/var/jenkins_home\nvolumes:\n  jenkins_home:"
          }
        ],
        practice: [
          {
            task: "Запустите Jenkins через Docker. Какие порты используются?",
            hint: "8080 — UI, 50000 — агенты.",
            solution: "docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts"
          }
        ],
        keyPoints: [
          "Docker — рекомендуемый способ",
          "Порт 8080 — UI, 50000 — агенты",
          "Начальный пароль в secrets/",
          "Java 11+ требуется"
        ]
      },
      {
        id: "lesson-2-2",
        title: "JCasC — Configuration as Code",
        description: "Конфигурация Jenkins через YAML",
        theory: [
          "JCasC позволяет управлять конфигурацией через YAML-файлы.",
          "Это позволяет версионировать конфигурацию и автоматизировать настройку.",
          "Включает: пользователи, права, плагины, инструменты."
        ],
        codeExamples: [
          {
            title: "JCasC конфигурация",
            language: "yaml",
            code: "jenkins:\n  systemMessage: \"Jenkins configured by JCasC\"\n  numExecutors: 0\n  securityRealm:\n    local:\n      users:\n        - id: \"admin\"\n          password: \"\\${ADMIN_PASSWORD}\"\n  authorizationStrategy:\n    roleBased:\n      roles:\n        global:\n          - name: \"admin\"\n            permissions: [\"Overall/Administer\"]\n            entries:\n              - user: \"admin\""
          }
        ],
        practice: [
          {
            task: "Создайте JCasC с ролями admin и developer.",
            hint: "Используйте authorizationStrategy.roleBased.roles.",
            solution: "jenkins:\n  authorizationStrategy:\n    roleBased:\n      roles:\n        global:\n          - name: \"admin\"\n            permissions: [\"Overall/Administer\"]\n          - name: \"developer\"\n            permissions: [\"Job/Build\", \"Job/Read\"]"
          }
        ],
        keyPoints: [
          "JCasC — конфигурация через YAML",
          "Версионирование конфигурации",
          "Автоматизация настройки"
        ]
      }
    ]
  },
  {
    id: "module-3",
    title: "Первый пайплайн",
    description: "Declarative Pipeline, работа с Git",
    icon: "📝",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Declarative Pipeline",
        description: "Основы синтаксиса Jenkinsfile",
        theory: [
          "Pipeline описывается в Jenkinsfile с использованием Groovy.",
          "Declarative Pipeline — структурированный синтаксис.",
          "Основные блоки: pipeline, agent, stages, stage, steps.",
          "post { } — действия после завершения (always, success, failure)."
        ],
        codeExamples: [
          {
            title: "Простой Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps {\n                sh 'npm run build'\n            }\n        }\n        stage('Test') {\n            steps {\n                sh 'npm test'\n            }\n        }\n    }\n    post {\n        success { echo '✅ Success!' }\n        failure { echo '❌ Failed!' }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для Node.js: Install, Lint, Test, Build.",
            hint: "Используйте stages с sh 'npm ...'.",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Install') { steps { sh 'npm ci' } }\n        stage('Lint') { steps { sh 'npm run lint' } }\n        stage('Test') { steps { sh 'npm test' } }\n        stage('Build') { steps { sh 'npm run build' } }\n    }\n}"
          }
        ],
        keyPoints: [
          "pipeline { } — корневой блок",
          "agent — где выполнять",
          "stages/stage/steps — структура",
          "post { } — после завершения"
        ]
      },
      {
        id: "lesson-3-2",
        title: "Работа с Git",
        description: "Multibranch Pipeline, webhooks",
        theory: [
          "Multibranch Pipeline автоматически создаёт пайплайны для каждой ветки.",
          "Webhook — мгновенный запуск при push.",
          "env.BRANCH_NAME — текущая ветка.",
          "when { } — условия выполнения stage."
        ],
        codeExamples: [
          {
            title: "Multibranch Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps { sh 'npm run build' }\n        }\n        stage('Deploy Staging') {\n            when { expression { env.BRANCH_NAME == 'develop' } }\n            steps { sh './deploy.sh staging' }\n        }\n        stage('Deploy Production') {\n            when { expression { env.BRANCH_NAME == 'main' } }\n            steps {\n                input message: 'Deploy to production?'\n                sh './deploy.sh production'\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline с разным поведением для develop и main.",
            hint: "Используйте when { expression { } }.",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Build') { steps { sh 'npm run build' } }\n        stage('Deploy Staging') {\n            when { expression { env.BRANCH_NAME == 'develop' } }\n            steps { sh './deploy.sh staging' }\n        }\n        stage('Deploy Production') {\n            when { expression { env.BRANCH_NAME == 'main' } }\n            steps { sh './deploy.sh production' }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Multibranch — пайплайны для каждой ветки",
          "Webhook — мгновенный запуск",
          "env.BRANCH_NAME — текущая ветка",
          "when { } — условия"
        ]
      }
    ]
  },
  {
    id: "module-4",
    title: "Docker и Jenkins",
    description: "Сборка образов, Docker agents",
    icon: "🐳",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Docker Pipeline",
        description: "Сборка и пуш Docker образов",
        theory: [
          "Docker Pipeline плагин позволяет собирать образы в Jenkins.",
          "docker.build() — сборка образа.",
          "docker.withRegistry() — авторизация в реестре.",
          "Multi-stage builds уменьшают размер образа."
        ],
        codeExamples: [
          {
            title: "Docker Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent any\n    environment {\n        REGISTRY = 'registry.example.com'\n        IMAGE = 'myapp'\n    }\n    stages {\n        stage('Build Image') {\n            steps {\n                script {\n                    docker.build(\"\\${REGISTRY}/\\${IMAGE}:\\${env.BUILD_NUMBER}\")\n                }\n            }\n        }\n        stage('Push') {\n            steps {\n                script {\n                    docker.withRegistry(\"https://\\${REGISTRY}\", 'docker-creds') {\n                        docker.image(\"\\${REGISTRY}/\\${IMAGE}:\\${env.BUILD_NUMBER}\").push()\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для сборки и пуша Docker образа.",
            hint: "Используйте docker.build() и docker.withRegistry().",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps {\n                script {\n                    docker.build(\"myapp:\\${env.BUILD_NUMBER}\")\n                }\n            }\n        }\n        stage('Push') {\n            steps {\n                script {\n                    docker.withRegistry('https://registry.io', 'creds') {\n                        docker.image(\"myapp:\\${env.BUILD_NUMBER}\").push()\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "docker.build() — сборка",
          "docker.withRegistry() — авторизация",
          "Multi-stage builds",
          "Сканирование образов"
        ]
      }
    ]
  },
  {
    id: "module-5",
    title: "Продвинутые пайплайны",
    description: "Shared Libraries, параметры, матрицы",
    icon: "🔧",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Параметры и условия",
        description: "parameters, input, when",
        theory: [
          "parameters { } — входные данные пайплайна.",
          "Типы: string, booleanParam, choice, password.",
          "input — пауза для подтверждения.",
          "when { } — условия: branch, expression, allOf, anyOf."
        ],
        codeExamples: [
          {
            title: "Параметризованный Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent any\n    parameters {\n        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'])\n        string(name: 'VERSION', defaultValue: 'latest')\n        booleanParam(name: 'RUN_TESTS', defaultValue: true)\n    }\n    stages {\n        stage('Confirm') {\n            when { expression { params.ENV == 'prod' } }\n            steps {\n                input message: \"Deploy to production?\", submitter: 'admin'\n            }\n        }\n        stage('Deploy') {\n            steps {\n                sh \"./deploy.sh \\${params.ENV} \\${params.VERSION}\"\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте параметризованный пайплайн с выбором окружения.",
            hint: "Используйте parameters { choice() } и when { }.",
            solution: "pipeline {\n    agent any\n    parameters {\n        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'])\n    }\n    stages {\n        stage('Deploy') {\n            when { expression { params.ENV == 'prod' } }\n            steps {\n                input message: 'Confirm production deploy?'\n            }\n            steps { sh \"./deploy.sh \\${params.ENV}\" }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "parameters { } — входные данные",
          "input — подтверждение",
          "when { } — условия",
          "params.NAME — доступ к параметрам"
        ]
      },
      {
        id: "lesson-5-2",
        title: "Матричные сборки",
        description: "Matrix builds, параллелизм",
        theory: [
          "Matrix builds — запуск с разными параметрами.",
          "Parallel stages — параллельное выполнение.",
          "failFast — отмена при падении.",
          "timeout — ограничение времени."
        ],
        codeExamples: [
          {
            title: "Matrix Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent none\n    stages {\n        stage('Matrix') {\n            matrix {\n                axes {\n                    axis { name: 'NODE_VERSION'; values: '16', '18', '20' }\n                    axis { name: 'OS'; values: 'ubuntu', 'alpine' }\n                }\n                stages {\n                    stage('Test') {\n                        agent { docker { image: \"node:\\${NODE_VERSION}-\\${OS}\" } }\n                        steps { sh 'npm test' }\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Matrix Pipeline для тестирования на разных JDK.",
            hint: "Используйте matrix { axes { axis { } } }.",
            solution: "pipeline {\n    agent none\n    stages {\n        stage('Test Matrix') {\n            matrix {\n                axes {\n                    axis { name: 'JDK'; values: '11', '17', '21' }\n                }\n                stages {\n                    stage('Test') {\n                        agent { docker { image: \"eclipse-temurin:\\${JDK}\" } }\n                        steps { sh './gradlew test' }\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Matrix — комбинации параметров",
          "Parallel — ускорение",
          "failFast — отмена при ошибке",
          "timeout — защита от зависания"
        ]
      }
    ]
  },
  {
    id: "module-6",
    title: "Kubernetes и Jenkins",
    description: "Jenkins на K8s, Helm, деплой",
    icon: "☸️",
    lessons: [
      {
        id: "lesson-6-1",
        title: "Jenkins на Kubernetes",
        description: "Динамические агенты, Helm",
        theory: [
          "Jenkins на K8s — динамические агенты в подах.",
          "Helm — пакетный менеджер для K8s.",
          "helm upgrade --install --atomic — безопасный деплой.",
          "Rollback при неудаче."
        ],
        codeExamples: [
          {
            title: "Kubernetes Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent {\n        kubernetes {\n            yaml \"\"\"\napiVersion: v1\nkind: Pod\nspec:\n  containers:\n    - name: helm\n      image: alpine/helm:latest\n      command: ['sleep', 'infinity']\n\"\"\"\n        }\n    }\n    stages {\n        stage('Deploy') {\n            steps {\n                container('helm') {\n                    sh \"helm upgrade --install myapp ./chart --set image.tag=\\${env.BUILD_NUMBER} --atomic --wait\"\n                }\n            }\n        }\n    }\n    post {\n        failure {\n            container('helm') {\n                sh 'helm rollback myapp'\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для деплоя в K8s с Helm и rollback.",
            hint: "Используйте container('helm') и post { failure { } }.",
            solution: "pipeline {\n    agent { kubernetes { yamlFile 'k8s/agent.yaml' } }\n    stages {\n        stage('Deploy') {\n            steps {\n                container('helm') {\n                    sh \"helm upgrade --install app ./chart --set image.tag=\\${BUILD_NUMBER} --atomic\"\n                }\n            }\n        }\n    }\n    post {\n        failure {\n            container('helm') { sh 'helm rollback app' }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Динамические агенты в K8s",
          "Helm для деплоя",
          "--atomic — автоматический rollback",
          "Multi-container pods"
        ]
      }
    ]
  },
  {
    id: "module-7",
    title: "Тестирование",
    description: "Unit, Integration, E2E, SonarQube",
    icon: "🧪",
    lessons: [
      {
        id: "lesson-7-1",
        title: "Виды тестов в CI/CD",
        description: "Пирамида тестирования",
        theory: [
          "Пирамида: Unit (много) → Integration → E2E (мало).",
          "junit — публикация результатов тестов.",
          "publishHTML — отчёты о покрытии.",
          "SonarQube — статический анализ."
        ],
        codeExamples: [
          {
            title: "Pipeline с тестами",
            language: "groovy",
            code: "pipeline {\n    agent any\n    stages {\n        stage('Unit Tests') {\n            steps { sh 'npm run test:unit -- --coverage' }\n            post { always { junit 'test-results/*.xml' } }\n        }\n        stage('E2E Tests') {\n            when { branch 'main' }\n            steps { sh 'npx cypress run' }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline с Unit и Integration тестами.",
            hint: "Используйте junit для публикации результатов.",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Unit') {\n            steps { sh 'npm test' }\n            post { always { junit 'results/*.xml' } }\n        }\n        stage('Integration') {\n            steps {\n                sh 'docker-compose up -d'\n                sh 'npm run test:integration'\n            }\n            post { always { sh 'docker-compose down -v' } }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Пирамида тестов",
          "junit — результаты тестов",
          "publishHTML — coverage",
          "SonarQube — анализ кода"
        ]
      }
    ]
  },
  {
    id: "module-8",
    title: "Уведомления",
    description: "Slack, Email, Telegram",
    icon: "🔔",
    lessons: [
      {
        id: "lesson-8-1",
        title: "Slack уведомления",
        description: "Настройка уведомлений",
        theory: [
          "slackSend — уведомления в Slack.",
          "post { } — триггеры: success, failure, always.",
          "Цвета: good (зелёный), danger (красный), warning (жёлтый).",
          "Не спамить — только failure и changed."
        ],
        codeExamples: [
          {
            title: "Slack уведомления",
            language: "groovy",
            code: "pipeline {\n    agent any\n    stages {\n        stage('Build') { steps { sh 'npm run build' } }\n    }\n    post {\n        success {\n            slackSend channel: '#deployments', color: 'good',\n                message: \"✅ Build \\${env.JOB_NAME} #\\${env.BUILD_NUMBER} success\"\n        }\n        failure {\n            slackSend channel: '#alerts', color: 'danger',\n                message: \"❌ Build \\${env.JOB_NAME} failed!\"\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте уведомления в Slack для success и failure.",
            hint: "Используйте slackSend в post { }.",
            solution: "pipeline {\n    agent any\n    stages { stage('Build') { steps { sh 'npm build' } } }\n    post {\n        success { slackSend channel: '#ci', color: 'good', message: 'Success!' }\n        failure { slackSend channel: '#ci', color: 'danger', message: 'Failed!' }\n    }\n}"
          }
        ],
        keyPoints: [
          "slackSend — уведомления",
          "post { success/failure }",
          "Цвета для идентификации",
          "Не спамить"
        ]
      }
    ]
  },
  {
    id: "module-9",
    title: "Безопасность",
    description: "Credentials, Vault, секреты",
    icon: "🔒",
    lessons: [
      {
        id: "lesson-9-1",
        title: "Управление секретами",
        description: "Credentials, withCredentials",
        theory: [
          "Credentials — безопасное хранение секретов.",
          "withCredentials() — использование в пайплайне.",
          "Vault — внешнее хранение секретов.",
          "Никогда не хардкодите секреты!"
        ],
        codeExamples: [
          {
            title: "Безопасное использование credentials",
            language: "groovy",
            code: "pipeline {\n    agent any\n    stages {\n        stage('Deploy') {\n            steps {\n                withCredentials([\n                    usernamePassword(credentialsId: 'deploy-creds',\n                        usernameVariable: 'USER', passwordVariable: 'PASS')\n                ]) {\n                    sh \"\"\"\n                        set +x\n                        curl -u \"\\${USER}:\\${PASS}\" https://api.example.com\n                    \"\"\"\n                }\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline с безопасным использованием credentials.",
            hint: "Используйте withCredentials() и set +x.",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Deploy') {\n            steps {\n                withCredentials([string(credentialsId: 'token', variable: 'TOKEN')]) {\n                    sh \"\"\"\n                        set +x\n                        curl -H \"Authorization: Bearer \\${TOKEN}\" https://api.example.com\n                    \"\"\"\n                }\n            }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Credentials — хранение секретов",
          "withCredentials() — использование",
          "set +x — отключение echo",
          "Vault — внешнее хранение"
        ]
      }
    ]
  },
  {
    id: "module-10",
    title: "Troubleshooting",
    description: "Отладка, логи, типичные ошибки",
    icon: "🔍",
    lessons: [
      {
        id: "lesson-10-1",
        title: "Отладка пайплайнов",
        description: "Debug, Replay, логи",
        theory: [
          "Replay — быстрый перезапуск с изменениями.",
          "set -x — вывод всех команд.",
          "try/catch — обработка ошибок.",
          "timestamps() — временные метки."
        ],
        codeExamples: [
          {
            title: "Debug Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent any\n    options { timestamps() }\n    stages {\n        stage('Debug') {\n            steps {\n                script {\n                    echo \"Job: \\${env.JOB_NAME}\"\n                    echo \"Build: #\\${env.BUILD_NUMBER}\"\n                    sh 'set -x && ./build.sh'\n                }\n            }\n        }\n        stage('Error Handling') {\n            steps {\n                script {\n                    try {\n                        sh './risky-command.sh'\n                    } catch (Exception e) {\n                        echo \"Error: \\${e.message}\"\n                        sh 'env > debug-env.txt'\n                        archiveArtifacts 'debug-*.txt'\n                        error 'Pipeline failed'\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте debug-пайплайн с try/catch и сохранением логов.",
            hint: "Используйте try/catch и archiveArtifacts.",
            solution: "pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps {\n                script {\n                    try {\n                        sh './build.sh'\n                    } catch (Exception e) {\n                        echo \"Failed: \\${e.message}\"\n                        sh 'env > debug.txt'\n                        archiveArtifacts 'debug.txt'\n                        error 'Build failed'\n                    }\n                }\n            }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Replay — быстрый перезапуск",
          "set -x — вывод команд",
          "try/catch — обработка ошибок",
          "archiveArtifacts — сохранение логов"
        ]
      }
    ]
  },
  {
    id: "module-11",
    title: "DevOps Best Practices",
    description: "Production-ready пайплайны, GitOps",
    icon: "🏆",
    lessons: [
      {
        id: "lesson-11-1",
        title: "Production-ready CI/CD",
        description: "Полный пайплайн от коммита до продакшна",
        theory: [
          "Полный цикл: lint → test → security → build → deploy → verify.",
          "Canary/Blue-Green деплой.",
          "Автоматический rollback.",
          "Pipeline as Code — всё в Git."
        ],
        codeExamples: [
          {
            title: "Production Pipeline",
            language: "groovy",
            code: "pipeline {\n    agent none\n    options { timeout(time: 60, unit: 'MINUTES') }\n    stages {\n        stage('Build & Test') {\n            agent { docker { image: 'node:18-alpine' } }\n            steps { sh 'npm ci && npm test && npm run build' }\n        }\n        stage('Security') {\n            agent { docker { image: 'aquasec/trivy:latest' } }\n            steps { sh 'trivy fs --severity HIGH,CRITICAL .' }\n        }\n        stage('Docker') {\n            agent { label 'docker' }\n            steps {\n                script {\n                    docker.build(\"app:\\${env.BUILD_NUMBER}\")\n                    docker.withRegistry('https://registry.io', 'creds') {\n                        docker.image(\"app:\\${env.BUILD_NUMBER}\").push()\n                    }\n                }\n            }\n        }\n        stage('Deploy') {\n            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }\n            steps {\n                container('helm') {\n                    sh \"helm upgrade --install app ./chart --set image.tag=\\${BUILD_NUMBER} --atomic\"\n                }\n            }\n        }\n    }\n    post {\n        failure { echo 'Build failed!' }\n    }\n}"
          }
        ],
        practice: [
          {
            task: "Создайте production-ready пайплайн с тестами, security и деплоем.",
            hint: "Включите все этапы: lint, test, security, docker, deploy.",
            solution: "pipeline {\n    agent none\n    stages {\n        stage('Test') {\n            agent { docker { image: 'node:18' } }\n            steps { sh 'npm ci && npm test' }\n        }\n        stage('Security') {\n            agent { docker { image: 'trivy' } }\n            steps { sh 'trivy fs .' }\n        }\n        stage('Docker') {\n            agent { label 'docker' }\n            steps {\n                script {\n                    docker.build(\"app:\\${BUILD_NUMBER}\")\n                    docker.withRegistry('https://reg.io', 'creds') {\n                        docker.image(\"app:\\${BUILD_NUMBER}\").push()\n                    }\n                }\n            }\n        }\n        stage('Deploy') {\n            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }\n            steps {\n                container('helm') {\n                    sh \"helm upgrade --install app ./chart --set image.tag=\\${BUILD_NUMBER} --atomic\"\n                }\n            }\n        }\n    }\n}"
          }
        ],
        keyPoints: [
          "Полный цикл CI/CD",
          "Security на каждом этапе",
          "Автоматический rollback",
          "Pipeline as Code"
        ]
      }
    ]
  },
  {
    id: "module-12",
    title: "Финальный проект",
    description: "Capstone project",
    icon: "🎓",
    lessons: [
      {
        id: "lesson-12-1",
        title: "Capstone Project",
        description: "Создание полноценной CI/CD системы",
        theory: [
          "Финальный проект — создание CI/CD для микросервиса.",
          "Требования: автосборка, тесты, security, Docker, K8s деплой, мониторинг.",
          "Критерии: <15 минут, все тесты зелёные, нет уязвимостей.",
          "Документация: README с архитектурой и инструкциями."
        ],
        codeExamples: [
          {
            title: "Структура проекта",
            language: "text",
            code: "my-service/\n├── src/              # Код\n├── tests/            # Тесты\n├── charts/           # Helm chart\n├── k8s/              # K8s манифесты\n├── Jenkinsfile       # CI/CD\n├── docker-compose.yml\n└── README.md"
          }
        ],
        practice: [
          {
            task: "Создайте полный CI/CD пайплайн для вашего проекта.",
            hint: "Включите все этапы: lint, test, security, docker, deploy, verify.",
            solution: "pipeline {\n    agent none\n    options { timeout(time: 30, unit: 'MINUTES') }\n    stages {\n        stage('Build & Test') {\n            agent { docker { image: 'node:18' } }\n            steps { sh 'npm ci && npm test && npm run build' }\n        }\n        stage('Security') {\n            agent { docker { image: 'trivy' } }\n            steps { sh 'trivy fs --severity HIGH,CRITICAL .' }\n        }\n        stage('Docker') {\n            agent { label 'docker' }\n            steps {\n                script {\n                    docker.build(\"app:\\${BUILD_NUMBER}\")\n                    docker.withRegistry('https://reg.io', 'creds') {\n                        docker.image(\"app:\\${BUILD_NUMBER}\").push()\n                    }\n                }\n            }\n        }\n        stage('Deploy') {\n            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }\n            steps {\n                container('helm') {\n                    sh \"helm upgrade --install app ./chart --set image.tag=\\${BUILD_NUMBER} --atomic\"\n                }\n            }\n        }\n    }\n    post {\n        success { echo '✅ Deployed!' }\n        failure { echo '❌ Failed!' }\n    }\n}"
          }
        ],
        keyPoints: [
          "Полный цикл CI/CD",
          "Все этапы автоматизированы",
          "Security интегрирован",
          "Production-ready"
        ]
      }
    ]
  }
];
