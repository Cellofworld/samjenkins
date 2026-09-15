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
  // ═══════════════════════════════════════════
  // МОДУЛЬ 1: Введение в CI/CD и Jenkins
  // ═══════════════════════════════════════════
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
      },
      {
        id: "lesson-1-3",
        title: "Jenkins vs альтернативы",
        description: "Сравнение Jenkins с GitLab CI, GitHub Actions, CircleCI",
        theory: [
          "Jenkins — самый зрелый и гибкий инструмент CI/CD. Его главные преимущества: полностью бесплатный (open-source), огромное сообщество, 1800+ плагинов, полная кастомизация, поддержка любого сценария.",
          "GitLab CI/CD — встроен в GitLab, конфигурируется через .gitlab-ci.yml. Плюсы: тесная интеграция с GitLab, простой синтаксис, встроенный Container Registry. Минусы: привязка к GitLab, меньше гибкости.",
          "GitHub Actions — встроен в GitHub, YAML-конфигурация в .github/workflows/. Плюсы: marketplace с готовыми actions, тесная интеграция с GitHub. Минусы: привязка к GitHub, лимиты на бесплатном тарифе.",
          "CircleCI — облачный сервис с хорошей производительностью. Плюсы: быстрая сборка, удобный UI, кеширование. Минусы: платный для больших команд, менее гибкий.",
          "Когда выбрать Jenkins: нужна полная кастомизация, on-premise развёртывание, сложные пайплайны, интеграция с множеством инструментов, нет привязки к конкретному Git-хостингу.",
          "Когда выбрать альтернативы: простой CI/CD, команда уже использует GitLab/GitHub, не нужна сложная кастомизация, важна скорость настройки."
        ],
        codeExamples: [
          {
            title: "Сравнение синтаксиса CI/CD",
            language: "text",
            code: `═══════════════════════════════════════════════════════════════
                    СРАВНЕНИЕ ИНСТРУМЕНТОВ CI/CD
═══════════════════════════════════════════════════════════════

┌──────────────┬──────────┬──────────┬──────────┬──────────┐
│ Критерий     │ Jenkins  │ GitLab   │ GitHub   │ CircleCI │
│              │          │ CI       │ Actions  │          │
├──────────────┼──────────┼──────────┼──────────┼──────────┤
│ Стоимость    │ Free     │ Free*    │ Free*    │ Paid     │
│ Хостинг      │ On-prem  │ SaaS     │ SaaS     │ SaaS     │
│ Плагины      │ 1800+    │ -        │ 10000+   │ Limited  │
│ Гибкость     │ ★★★★★   │ ★★★☆☆   │ ★★★★☆   │ ★★★☆☆   │
│ Простота     │ ★★☆☆☆   │ ★★★★☆   │ ★★★★☆   │ ★★★★☆   │
│ On-premise   │ ✅       │ ✅       │ ❌       │ ❌       │
│ Pipeline     │ Groovy   │ YAML     │ YAML     │ YAML     │
│ Кастомизация │ ★★★★★   │ ★★★☆☆   │ ★★★★☆   │ ★★☆☆☆   │
└──────────────┴──────────┴──────────┴──────────┴──────────┘

* — бесплатные тарифы с ограничениями`
          }
        ],
        practice: [
          {
            task: "Вашей компании нужно CI/CD решение. Условия: on-premise, интеграция с 15+ инструментами, сложные multi-branch пайплайны, бюджет ограничен. Какой инструмент вы выберете и почему?",
            hint: "Подумайте о стоимости, гибкости и возможности on-premise развёртывания.",
            solution: "Jenkins — единственный инструмент, который одновременно: 1) Бесплатный (open-source), 2) Поддерживает on-premise, 3) Имеет 1800+ плагинов для интеграции с любыми инструментами, 4) Поддерживает сложные multi-branch пайплайны через Declarative Pipeline. Альтернативы либо платные (CircleCI), либо не поддерживают on-premise (GitHub Actions), либо менее гибкие (GitLab CI)."
          }
        ],
        keyPoints: [
          "Jenkins — самый гибкий и бесплатный инструмент",
          "GitLab CI — простота, но привязка к GitLab",
          "GitHub Actions — marketplace actions, но SaaS only",
          "Выбор зависит от требований: on-premise, бюджет, сложность",
          "Jenkins идеален для enterprise и сложных сценариев"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 2: Установка и настройка
  // ═══════════════════════════════════════════
  {
    id: "module-2",
    title: "Установка и настройка Jenkins",
    description: "Установка, настройка и конфигурация Jenkins",
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

# Jenkins с Docker-in-Docker
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
  -v jenkins-data:/var/jenkins_home \\
  -v /certs/client:/certs/client:ro \\
  jenkins/jenkins:lts`
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
        title: "Первичная настройка и JCasC",
        description: "Настройка плагинов, пользователей, Configuration as Code",
        theory: [
          "После первого входа в Jenkins необходимо установить плагины. Рекомендуемый набор включает: Git, Pipeline, Docker Pipeline, Credentials, Blue Ocean, Email Extension.",
          "Система прав доступа в Jenkins: по умолчанию все пользователи имеют полный доступ. Для продакшна рекомендуется настроить матрицу прав через плагин Role-Based Authorization Strategy.",
          "JCasC (Jenkins Configuration as Code) — подход, при котором вся конфигурация Jenkins описывается в YAML-файлах. Это позволяет версионировать конфигурацию, воспроизводить окружения и автоматизировать настройку.",
          "Global Tool Configuration — настройка путей к инструментам (JDK, Maven, Gradle, Node.js, Git). Jenkins может автоматически устанавливать инструменты при необходимости.",
          "System Configuration — настройка количества потоков (executors), URL Jenkins, email-уведомлений, прокси.",
          "Manage Jenkins → Configure System — основная страница настроек. Здесь настраивается большинство глобальных параметров."
        ],
        codeExamples: [
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
            task: "Настройте Jenkins с помощью JCasC. Создайте конфигурацию с двумя ролями: admin (полный доступ) и developer (только сборка и чтение).",
            hint: "Используйте YAML-формат. Роли определяются в разделе authorizationStrategy.roleBased.roles.",
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
      },
      {
        id: "lesson-2-3",
        title: "Настройка агентов",
        description: "Подключение и настройка Jenkins агентов",
        theory: [
          "Jenkins агенты (nodes) — это машины, которые выполняют задачи по указанию контроллера. Они позволяют распределить нагрузку и выполнять сборки на разных платформах.",
          "Существует два способа подключения агентов: JNLP (Java Network Launch Protocol) — агент подключается к контроллеру, и SSH — контроллер подключается к агенту по SSH.",
          "JNLP-агенты работают как Java-процесс на целевой машине. Они сами инициируют подключение к контроллеру. Это удобно для машин за NAT или firewall.",
          "SSH-агенты требуют настройки SSH-доступа от контроллера к агенту. Контроллер подключается по SSH для выполнения задач. Это проще в настройке, но требует открытого SSH-порта.",
          "Labels (метки) — теги, которые назначаются агентам. Пайплайны могут указывать, на каком агенте (по метке) выполняться. Например, 'docker', 'linux', 'windows', 'gpu'.",
          "Executors — количество одновременных задач, которые может выполнять агент. Рекомендуется: 2-4 для обычных агентов, 0 для контроллера (чтобы не нагружать его)."
        ],
        codeExamples: [
          {
            title: "Настройка JNLP-агента",
            language: "bash",
            code: `# 1. В Jenkins UI: Manage Jenkins → Nodes → New Node
#    Имя: agent-1, Type: Permanent Agent

# 2. Настройка агента:
#    Remote root directory: /home/jenkins/agent
#    Labels: linux docker java
#    Usage: Use this node as much as possible
#    Launch method: Launch agent via JNLP

# 3. Запуск агента на целевой машине:
#    Скопируйте команду из Jenkins UI

java -jar agent.jar \\
  -jnlpUrl http://jenkins:8080/computer/agent-1/jenkins-agent.jnlp \\
  -secret <secret-token> \\
  -workDir /home/jenkins/agent

# Запуск в фоне (systemd):
# /etc/systemd/system/jenkins-agent.service
[Unit]
Description=Jenkins Agent
After=network.target

[Service]
Type=simple
User=jenkins
ExecStart=/usr/bin/java -jar /home/jenkins/agent/agent.jar \\
  -jnlpUrl http://jenkins:8080/computer/agent-1/jenkins-agent.jnlp \\
  -secret <secret-token> \\
  -workDir /home/jenkins/agent
Restart=always

[Install]
WantedBy=multi-user.target`
          },
          {
            title: "Pipeline с указанием агента по label",
            language: "groovy",
            code: `// Использование конкретного агента по label
pipeline {
    agent { label 'docker && linux' }
    
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}

// Разные stages на разных агентах
pipeline {
    agent none
    
    stages {
        stage('Build on Linux') {
            agent { label 'linux' }
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test on Windows') {
            agent { label 'windows' }
            steps {
                bat 'mvn test'
            }
        }
        stage('Deploy') {
            agent { label 'deploy' }
            steps {
                sh './deploy.sh'
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Опишите, как настроить 3 агента: linux-builder (для сборки), windows-tester (для тестов на Windows), deploy-agent (для деплоя). Какие labels назначите каждому?",
            hint: "Подумайте о разделении обязанностей и безопасности. Каждый агент должен иметь специфичные labels.",
            solution: `1. linux-builder:
   - Labels: linux, builder, java, docker
   - Executors: 4
   - Usage: Only for tied jobs
   - Purpose: компиляция, сборка Docker образов

2. windows-tester:
   - Labels: windows, tester, dotnet
   - Executors: 2
   - Usage: Only for tied jobs
   - Purpose: запуск .NET тестов, UI тестов

3. deploy-agent:
   - Labels: deploy, production, secure
   - Executors: 1
   - Usage: Only for tied jobs
   - Purpose: деплой (имеет доступ к продакшн credentials)

pipeline {
    agent none
    stages {
        stage('Build') {
            agent { label 'linux-builder' }
            steps { sh 'mvn clean package' }
        }
        stage('Test') {
            agent { label 'windows-tester' }
            steps { bat 'dotnet test' }
        }
        stage('Deploy') {
            agent { label 'deploy-agent' }
            steps { sh './deploy.sh production' }
        }
    }
}`
          }
        ],
        keyPoints: [
          "JNLP — агент подключается к контроллеру (удобно за NAT)",
          "SSH — контроллер подключается к агенту (проще настроить)",
          "Labels — теги для выбора подходящего агента",
          "Executors — количество одновременных задач на агенте",
          "Controller должен иметь 0 executors (не нагружать)"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 3: Первый пайплайн
  // ═══════════════════════════════════════════
  {
    id: "module-3",
    title: "Первый пайплайн",
    description: "Создание Pipeline, основы синтаксиса, работа с Git",
    icon: "📝",
    lessons: [
      {
        id: "lesson-3-1",
        title: "Declarative Pipeline",
        description: "Основы синтаксиса Declarative Pipeline",
        theory: [
          "Jenkins Pipeline — это набор инструкций для автоматизации процесса доставки ПО. Пайплайн описывается в файле Jenkinsfile с использованием Groovy-синтаксиса.",
          "Declarative Pipeline — более структурированный и рекомендуемый синтаксис. Он строже, но проще для чтения и написания. Ошибки в синтаксисе обнаруживаются раньше.",
          "Основные блоки Declarative Pipeline: pipeline { }, agent { }, stages { }, stage('Name') { }, steps { }. Каждый stage представляет этап пайплайна (сборка, тест, деплой).",
          "agent определяет, где будет выполняться пайплайн. Варианты: any (любой доступный агент), none (без агента), label (конкретный агент), docker (в контейнере).",
          "steps — это команды, которые выполняются на каждом этапе. Основные директивы: sh (выполнение shell-команд), echo (вывод сообщения), script (вставка Scripted-блока).",
          "post { } — блок, выполняемый после завершения всех stages. Секции: always (всегда), success (при успехе), failure (при ошибке), unstable (при нестабильном результате), changed (при изменении статуса)."
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
            echo '✅ Пайплайн успешен!'
        }
        failure {
            echo '❌ Пайплайн провален!'
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
          }
        ],
        practice: [
          {
            task: "Создайте Jenkinsfile для Node.js проекта с этапами: Install, Lint, Test, Build. Добавьте post-блок с уведомлениями об успехе/неудаче.",
            hint: "Используйте sh 'npm install', sh 'npm run lint' и т.д. В post-блоке используйте success {} и failure {}.",
            solution: `pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('Lint') {
            steps { sh 'npm run lint' }
        }
        stage('Test') {
            steps { sh 'npm test' }
        }
        stage('Build') {
            steps { sh 'npm run build' }
        }
    }

    post {
        always {
            echo "Pipeline finished"
            cleanWs()
        }
        success {
            echo "✅ Build successful!"
        }
        failure {
            echo "❌ Build failed!"
        }
    }
}`
          }
        ],
        keyPoints: [
          "pipeline { } — корневой блок",
          "agent — где выполнять (any, docker, label)",
          "stages/stage/steps — структура пайплайна",
          "environment { } — переменные окружения",
          "post { } — действия после завершения",
          "when { } — условия выполнения stage"
        ]
      },
      {
        id: "lesson-3-2",
        title: "Триггеры и расписания",
        description: "Автоматический запуск пайплайнов",
        theory: [
          "Triggers — механизмы автоматического запуска пайплайна. Jenkins поддерживает несколько типов триггеров: polling (опрос репозитория), webhook (уведомление от Git), cron (по расписанию), upstream (после другого пайплайна).",
          "Polling SCM — Jenkins периодически опрашивает репозиторий на наличие новых коммитов. Настраивается через cron-синтаксис (H/5 * * * * — каждые 5 минут). Неэффективно для больших репозиториев.",
          "Webhook — Git-сервер (GitHub, GitLab) уведомляет Jenkins о новых коммитах через HTTP-запрос. Мгновенный запуск, без задержек. Рекомендуемый подход.",
          "Cron-триггер — запуск по расписанию, например, ночные сборки (H 2 * * * — каждый день в 2:00). Полезно для длительных тестов, отчётов, обслуживания.",
          "Upstream triggers — запуск пайплайна после завершения другого. Используется для цепочек: build → test → deploy. Настраивается через build job: 'other-job' в post-блоке.",
          "H (Hash) в cron-выражениях — Jenkins распределяет нагрузки, добавляя случайное смещение. H/15 * * * * означает 'примерно каждые 15 минут', но не все одновременно."
        ],
        codeExamples: [
          {
            title: "Триггеры в Pipeline",
            language: "groovy",
            code: `pipeline {
    agent any

    triggers {
        // Опрос Git каждые 15 минут
        pollSCM('H/15 * * * *')

        // Ночная сборка в 2:00
        cron('H 2 * * *')

        // Запуск после другого job
        upstream(
            upstreamProjects: 'build-job, lint-job',
            threshold: hudson.model.Result.SUCCESS
        )
    }

    stages {
        stage('Build') {
            steps {
                sh 'echo "Triggered!"'
            }
        }
    }
}

// Webhook URL для GitHub:
// http://jenkins:8080/github-webhook/
//
// Webhook URL для GitLab:
// http://jenkins:8080/project/my-pipeline
//
// Generic Webhook (плагин Generic Webhook Trigger):
// http://jenkins:8080/generic-webhook-trigger/invoke?token=xxx`
          },
          {
            title: "Cron-синтаксис Jenkins",
            language: "text",
            code: `┌───────────── минута (0-59)
│ ┌───────────── час (0-23)
│ │ ┌───────────── день месяца (1-31)
│ │ │ ┌───────────── месяц (1-12)
│ │ │ │ ┌───────────── день недели (0-7, 0 и 7 = воскресенье)
│ │ │ │ │
* * * * *

Специальные символы:
  H    — Hash (случайное, но стабильное значение)
  *    — любое значение
  ,    — список значений (1,3,5)
  -    — диапазон (1-5)
  /    — шаг (H/15 = каждые ~15 минут)

Примеры:
  H/5 * * * *        — каждые ~5 минут
  H 2 * * *          — каждый день в ~2:00
  H 2 * * 1-5        — будни в ~2:00
  0 0 1 * *          — первый день месяца в полночь
  H/30 9-17 * * 1-5  — каждые ~30 мин в рабочее время
  H 8,12,18 * * *    — в 8:00, 12:00 и 18:00`
          }
        ],
        practice: [
          {
            task: "Настройте пайплайн с тремя триггерами: 1) webhook от GitHub, 2) ночная сборка в 3:00 по будням, 3) запуск после успешного завершения job 'build-base'.",
            hint: "Используйте triggers { } блок. Для webhook настройте URL в GitHub. Для cron используйте H 3 * * 1-5.",
            solution: `pipeline {
    agent any

    triggers {
        // Ночная сборка по будням в ~3:00
        cron('H 3 * * 1-5')

        // Запуск после build-base
        upstream(
            upstreamProjects: 'build-base',
            threshold: hudson.model.Result.SUCCESS
        )
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm ci && npm run build'
            }
        }
        stage('Nightly Tests') {
            when {
                triggeredBy 'TimerTrigger'
            }
            steps {
                sh 'npm run test:full'
            }
        }
    }
}

// Для GitHub webhook:
// 1. GitHub → Settings → Webhooks → Add webhook
// 2. Payload URL: http://jenkins:8080/github-webhook/
// 3. Content type: application/json
// 4. Events: Just the push event`
          }
        ],
        keyPoints: [
          "pollSCM — опрос репозитория (неэффективно)",
          "Webhook — мгновенный запуск (рекомендуется)",
          "cron — запуск по расписанию",
          "upstream — цепочки пайплайнов",
          "H (Hash) — распределение нагрузки",
          "triggeredBy — определение типа триггера"
        ]
      },
      {
        id: "lesson-3-3",
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
  // ═══════════════════════════════════════════
  // МОДУЛЬ 4: Docker и Jenkins
  // ═══════════════════════════════════════════
  {
    id: "module-4",
    title: "Docker и Jenkins",
    description: "Сборка Docker образов, Docker agents, Docker Compose",
    icon: "🐳",
    lessons: [
      {
        id: "lesson-4-1",
        title: "Docker Pipeline",
        description: "Сборка Docker образов и Docker agents",
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
                    docker.build(
                        "\${REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}",
                        "--build-arg VERSION=\${env.BUILD_NUMBER} ."
                    )
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry(
                        "https://\${REGISTRY}",
                        "\${DOCKER_CREDENTIALS}"
                    ) {
                        def builtImage = docker.image(
                            "\${REGISTRY}/\${IMAGE_NAME}:\${env.BUILD_NUMBER}"
                        )
                        builtImage.push()
                        builtImage.push('latest')
                    }
                }
            }
        }
    }
}`
          },
          {
            title: "Dockerfile для Node.js приложения",
            language: "dockerfile",
            code: `# Multi-stage build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

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
  CMD wget --no-verbose --tries=1 --spider \\
    http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline, который: 1) Собирает Docker-образ с тегом из номера сборки, 2) Сканирует образ на уязвимости (trivy), 3) Пушит образ в registry, если сканирование пройдено.",
            hint: "Используйте sh 'trivy image' для сканирования. Если trivy завершится с ошибкой, stage провалится и пуш не выполнится.",
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
                    docker.withRegistry(
                        "https://\${REGISTRY}",
                        'registry-creds'
                    ) {
                        def img = docker.image(
                            "\${REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}"
                        )
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
          "Безопасность: сканирование образов перед пушем"
        ]
      },
      {
        id: "lesson-4-2",
        title: "Docker Compose в пайплайнах",
        description: "Интеграционные тесты с Docker Compose",
        theory: [
          "Docker Compose позволяет запускать многоконтейнерные приложения. В Jenkins это используется для интеграционных тестов: база данных, кеш, очереди — всё поднимается в контейнерах.",
          "Типичный сценарий: пайплайн запускает docker-compose up для поднятия зависимостей (PostgreSQL, Redis, Kafka), выполняет тесты, затем docker-compose down для очистки.",
          "docker-compose.override.yml — файл для переопределения настроек в CI. Например, можно отключить volumes, изменить порты, добавить healthcheck.",
          "Wait for services — перед запуском тестов нужно дождаться, пока все сервисы готовы. Используются wait-for-it.sh, dockerize или healthcheck в docker-compose.",
          "Параллельные сборки — при параллельном выполнении пайплайнов на одном агенте могут возникнуть конфликты портов. Решение: динамические порты через переменные окружения.",
          "Resource limits — ограничение ресурсов для контейнеров в CI, чтобы одна сборка не потребляла все ресурсы агента."
        ],
        codeExamples: [
          {
            title: "Интеграционные тесты с Docker Compose",
            language: "groovy",
            code: `pipeline {
    agent { label 'docker' }

    stages {
        stage('Start Services') {
            steps {
                sh '''
                    docker-compose -f docker-compose.yml \\
                        -f docker-compose.ci.yml up -d
                    
                    # Ждём готовности сервисов
                    echo "Waiting for PostgreSQL..."
                    timeout 60 bash -c 'until \\
                        docker-compose exec -T postgres \\
                        pg_isready; do sleep 2; done'
                    
                    echo "Waiting for Redis..."
                    timeout 30 bash -c 'until \\
                        docker-compose exec -T redis \\
                        redis-cli ping; do sleep 2; done'
                '''
            }
        }
        stage('Integration Tests') {
            steps {
                sh '''
                    export DATABASE_URL=postgresql://test:test@localhost:5432/testdb
                    export REDIS_URL=redis://localhost:6379
                    npm run test:integration
                '''
            }
            post {
                always {
                    junit 'test-results/integration/*.xml'
                }
            }
        }
    }

    post {
        always {
            sh 'docker-compose down -v --remove-orphans || true'
        }
    }
}`
          },
          {
            title: "docker-compose.ci.yml",
            language: "yaml",
            code: `# Override для CI окружения
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U test"]
      interval: 5s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 256M

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5
    deploy:
      resources:
        limits:
          memory: 128M

  kafka:
    image: confluentinc/cp-kafka:latest
    environment:
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    ports:
      - "9092:9092"
    deploy:
      resources:
        limits:
          memory: 512M`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для интеграционных тестов: поднимите PostgreSQL и Redis через Docker Compose, дождитесь их готовности, запустите тесты, очистите окружение.",
            hint: "Используйте healthcheck в docker-compose и цикл ожидания в bash.",
            solution: `pipeline {
    agent { label 'docker' }

    stages {
        stage('Start Services') {
            steps {
                sh 'docker-compose -f docker-compose.ci.yml up -d'
                sh '''
                    echo "Waiting for PostgreSQL..."
                    for i in $(seq 1 30); do
                        if docker-compose exec -T postgres pg_isready 2>/dev/null; then
                            echo "PostgreSQL is ready!"
                            break
                        fi
                        sleep 2
                    done
                '''
            }
        }
        stage('Run Tests') {
            steps {
                sh '''
                    export DB_HOST=localhost
                    export DB_PORT=5432
                    npm run test:integration
                '''
            }
        }
    }

    post {
        always {
            sh 'docker-compose down -v --remove-orphans || true'
        }
    }
}`
          }
        ],
        keyPoints: [
          "Docker Compose — многоконтейнерные тесты",
          "Override файлы для CI окружения",
          "Healthcheck — ожидание готовности сервисов",
          "Resource limits — контроль ресурсов",
          "post { always } — очистка после тестов"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 5: Продвинутые пайплайны
  // ═══════════════════════════════════════════
  {
    id: "module-5",
    title: "Продвинутые пайплайны",
    description: "Shared Libraries, параметры, матричные сборки",
    icon: "🔧",
    lessons: [
      {
        id: "lesson-5-1",
        title: "Параметризация пайплайнов",
        description: "Параметры, input, условное выполнение",
        theory: [
          "Parameters — входные данные для пайплайна. Позволяют запускать один и тот же пайплайн с разными настройками без изменения кода. Параметры задаются в блоке parameters { }.",
          "Типы параметров: string (строка), booleanParam (true/false), choice (выбор из списка), password (скрытый ввод), text (многострочный текст), file (загрузка файла).",
          "input step — пауза в пайплайне для ручного подтверждения. Полезно перед деплоем в production. Поддерживает submitter — ограничение по пользователям/группам.",
          "when { } — условия выполнения stage. Директивы: branch (ветка), environment (переменная), expression (Groovy-выражение), allOf (AND), anyOf (OR), not (NOT).",
          "Тернарный оператор в Groovy — условные выражения прямо в шагах: def result = condition ? 'value1' : 'value2'.",
          "Параметры доступны через params.PARAM_NAME или env.PARAM_NAME. Параметры, заданные при запуске, переопределяют значения по умолчанию."
        ],
        codeExamples: [
          {
            title: "Параметризованный Pipeline",
            language: "groovy",
            code: `pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['dev', 'staging', 'production'],
            description: 'Target environment'
        )
        string(
            name: 'VERSION',
            defaultValue: 'latest',
            description: 'Version to deploy'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run test suite?'
        )
        password(
            name: 'DEPLOY_TOKEN',
            description: 'Deployment token'
        )
        text(
            name: 'RELEASE_NOTES',
            defaultValue: '',
            description: 'Release notes'
        )
    }

    stages {
        stage('Validate') {
            steps {
                script {
                    echo "Environment: \${params.ENVIRONMENT}"
                    echo "Version: \${params.VERSION}"
                    
                    if (params.ENVIRONMENT == 'production') {
                        input message: "Deploy \${params.VERSION} to PRODUCTION?",
                              ok: 'Yes, deploy!',
                              submitter: 'admin,tech-lead'
                    }
                }
            }
        }
        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh "./deploy.sh \${params.ENVIRONMENT} \${params.VERSION}"
            }
        }
    }
}`
          },
          {
            title: "Условия выполнения stages",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Build') {
            steps { sh 'npm run build' }
        }

        // Выполняется только для ветки main
        stage('Deploy Production') {
            when { branch 'main' }
            steps { sh './deploy.sh prod' }
        }

        // Выполняется если все условия true
        stage('Full Test Suite') {
            when {
                allOf {
                    branch 'main'
                    not { triggeredBy 'TimerTrigger' }
                    expression { params.RUN_TESTS == true }
                }
            }
            steps { sh 'npm run test:full' }
        }

        // Выполняется если хотя бы одно условие true
        stage('Special Build') {
            when {
                anyOf {
                    branch 'release/*'
                    tag pattern: 'v\\d+\\.\\d+\\.\\d+', comparator: 'REGEXP'
                }
            }
            steps { sh 'npm run build:release' }
        }

        // Сравнение с предыдущим результатом
        stage('Notify on Status Change') {
            when {
                expression {
                    currentBuild.previousBuild != null &&
                    currentBuild.result != currentBuild.previousBuild.result
                }
            }
            steps {
                echo "Status changed! Sending notification..."
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте параметризованный пайплайн для деплоя: выбор окружения (dev/staging/production), версия, запуск тестов (boolean). Для production — подтверждение от tech-lead.",
            hint: "Используйте parameters { choice(), string(), booleanParam() } и input с submitter.",
            solution: `pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV',
            choices: ['dev', 'staging', 'production'],
            description: 'Target environment'
        )
        string(
            name: 'VERSION',
            defaultValue: 'latest',
            description: 'Version to deploy'
        )
        booleanParam(
            name: 'RUN_TESTS',
            defaultValue: true,
            description: 'Run tests before deploy?'
        )
    }

    stages {
        stage('Confirm Production') {
            when {
                expression { params.ENV == 'production' }
            }
            steps {
                input message: """
                    ⚠️ PRODUCTION DEPLOYMENT
                    Version: \${params.VERSION}
                    Are you sure?
                """,
                ok: 'Deploy to Production',
                submitter: 'tech-lead,admin'
            }
        }
        stage('Test') {
            when { expression { params.RUN_TESTS } }
            steps { sh 'npm test' }
        }
        stage('Deploy') {
            steps {
                sh "./deploy.sh \${params.ENV} \${params.VERSION}"
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "parameters { } — входные данные пайплайна",
          "choice, string, booleanParam, password — типы параметров",
          "input — пауза для ручного подтверждения",
          "submitter — ограничение по пользователям",
          "when { } — условия: branch, expression, allOf, anyOf",
          "params.NAME — доступ к параметрам"
        ]
      },
      {
        id: "lesson-5-2",
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
            title: "Использование Shared Library",
            language: "groovy",
            code: `// Подключение библиотеки
@Library('my-shared-library@v1.2.0') _

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
            notifySlack("❌ Build failed: \${env.JOB_NAME}")
        }
        success {
            notifySlack("✅ Build succeeded: \${env.JOB_NAME}")
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Shared Library функцию notifySlack.groovy, которая отправляет уведомления в Slack с цветовой индикацией и информацией о сборке.",
            hint: "Используйте curl для отправки в Slack webhook. Передавайте color и message.",
            solution: `// vars/notifySlack.groovy
def call(Map config = [:]) {
    def webhookUrl = config.webhookUrl ?: env.SLACK_WEBHOOK_URL
    def channel = config.channel ?: '#ci-cd'
    def status = config.status ?: (currentBuild.result ?: 'SUCCESS')
    def color = status == 'SUCCESS' ? '#36a64f' : '#ff0000'
    def emoji = status == 'SUCCESS' ? '✅' : '❌'

    def payload = """
    {
        "channel": "\${channel}",
        "attachments": [{
            "color": "\${color}",
            "title": "\${emoji} \${env.JOB_NAME} #\${env.BUILD_NUMBER}",
            "text": "Status: \${status}",
            "fields": [
                {"title": "Branch", "value": "\${env.BRANCH_NAME ?: 'N/A'}", "short": true},
                {"title": "Duration", "value": "\${currentBuild.durationString}", "short": true}
            ]
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
          "Версионирование обеспечивает стабильность"
        ]
      },
      {
        id: "lesson-5-3",
        title: "Матричные сборки",
        description: "Matrix builds, параллельное выполнение",
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
                            echo "Testing Node \${NODE_VERSION} / \${OS}"
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
                    steps { sh 'npm run test:unit' }
                    post {
                        always { junit 'test-results/unit/*.xml' }
                    }
                }
                stage('Integration Tests') {
                    steps { sh 'npm run test:integration' }
                    post {
                        always { junit 'test-results/integration/*.xml' }
                    }
                }
                stage('E2E Tests') {
                    steps { sh 'npm run test:e2e' }
                    post {
                        always { junit 'test-results/e2e/*.xml' }
                    }
                }
                stage('Security Scan') {
                    steps { sh 'npm audit --audit-level=high' }
                }
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Matrix Pipeline для тестирования Java-приложения на разных версиях JDK (11, 17, 21) и базах данных (PostgreSQL, MySQL). Добавьте failFast и таймаут.",
            hint: "Используйте matrix { axes { axis { } } } и options { timeout() }.",
            solution: `pipeline {
    agent none

    options {
        timeout(time: 45, unit: 'MINUTES')
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
                            echo "JDK \${JDK_VERSION} + \${DATABASE}"
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
  // ═══════════════════════════════════════════
  // МОДУЛЬ 6: Kubernetes и Jenkins
  // ═══════════════════════════════════════════
  {
    id: "module-6",
    title: "Kubernetes и Jenkins",
    description: "Jenkins на K8s, динамические агенты, деплой",
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
    - name: kubectl
      image: bitnami/kubectl:latest
      command: ['sleep', 'infinity']
    - name: helm
      image: alpine/helm:latest
      command: ['sleep', 'infinity']
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
        stage('Verify') {
            steps {
                container('kubectl') {
                    sh """
                        kubectl rollout status deployment/myapp \\
                            -n production --timeout=300s
                    """
                }
            }
        }
    }
}`
          },
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
  installPlugins:
    - kubernetes:latest
    - workflow-aggregator:latest
    - git:latest
    - configuration-as-code:latest
  JCasC:
    configScripts:
      welcome: |
        jenkins:
          systemMessage: "Jenkins on Kubernetes"

agent:
  enabled: true
  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1Gi"`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для деплоя в Kubernetes с Helm: сборка Docker-образа, push в registry, helm upgrade, проверка rollout и rollback при неудаче.",
            hint: "Используйте container('helm') и container('kubectl'). Добавьте post { failure { } } для rollback.",
            solution: `pipeline {
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
                        helm upgrade --install \${APP_NAME} ./chart \\
                            --namespace \${NAMESPACE} \\
                            --set image.tag=\${BUILD_NUMBER} \\
                            --wait --timeout 5m --atomic
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
                    """
                }
            }
        }
    }

    post {
        failure {
            container('helm') {
                sh "helm rollback \${APP_NAME} -n \${NAMESPACE}"
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
      },
      {
        id: "lesson-6-2",
        title: "Helm и деплой в Kubernetes",
        description: "Управление релизами через Helm charts",
        theory: [
          "Helm — пакетный менеджер для Kubernetes. Упрощает определение, установку и обновление приложений в K8s-кластере. Helm chart — набор шаблонов Kubernetes-манифестов.",
          "Структура Helm chart: Chart.yaml (метаданные), values.yaml (значения по умолчанию), templates/ (шаблоны манифестов), charts/ (зависимости).",
          "helm install — первая установка chart. helm upgrade — обновление существующего релиза. helm rollback — откат к предыдущей версии. helm uninstall — удаление релиза.",
          "Values — параметры, которые подставляются в шаблоны. Можно переопределять через --set или дополнительные values-файлы. Позволяет использовать один chart для разных окружений.",
          "helm upgrade --install — универсальная команда: устанавливает, если релиза нет, обновляет, если есть. --atomic — автоматический откат при неудаче.",
          "Helm repositories — хранилища chart (stable, bitnami, jetstack). helm repo add — добавление репозитория, helm search — поиск chart."
        ],
        codeExamples: [
          {
            title: "Структура Helm chart",
            language: "text",
            code: `myapp-chart/
├── Chart.yaml          # Метаданные chart
├── values.yaml         # Значения по умолчанию
├── values-staging.yaml # Override для staging
├── values-prod.yaml    # Override для production
├── templates/
│   ├── _helpers.tpl    # Шаблонные функции
│   ├── deployment.yaml # Deployment manifest
│   ├── service.yaml    # Service manifest
│   ├── ingress.yaml    # Ingress manifest
│   ├── hpa.yaml        # HorizontalPodAutoscaler
│   ├── configmap.yaml  # ConfigMap
│   └── secret.yaml     # Secret
└── charts/             # Зависимости
    └── redis/          # Subchart`
          },
          {
            title: "Helm deploy в Pipeline",
            language: "groovy",
            code: `pipeline {
    agent { label 'k8s' }

    environment {
        APP = 'my-service'
        NAMESPACE = 'production'
        CHART = './charts/my-service'
    }

    stages {
        stage('Helm Lint') {
            steps {
                sh "helm lint \${CHART}"
            }
        }
        stage('Helm Template') {
            steps {
                sh """
                    helm template \${APP} \${CHART} \\
                        -f \${CHART}/values-prod.yaml \\
                        --set image.tag=\${BUILD_NUMBER} \\
                        > rendered-manifests.yaml
                """
                // Проверка сгенерированных манифестов
                sh 'cat rendered-manifests.yaml'
            }
        }
        stage('Deploy') {
            steps {
                sh """
                    helm upgrade --install \${APP} \${CHART} \\
                        --namespace \${NAMESPACE} \\
                        -f \${CHART}/values-prod.yaml \\
                        --set image.tag=\${BUILD_NUMBER} \\
                        --set image.repository=registry.example.com/\${APP} \\
                        --wait --timeout 10m \\
                        --atomic \\
                        --history-max 10
                """
            }
        }
        stage('Verify') {
            steps {
                sh """
                    kubectl rollout status deployment/\${APP} \\
                        -n \${NAMESPACE} --timeout=300s
                    kubectl get pods -n \${NAMESPACE} -l app=\${APP}
                    helm history \${APP} -n \${NAMESPACE}
                """
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline для Helm-деплоя: lint chart, template для проверки, deploy с override values для staging и production, верификация.",
            hint: "Используйте helm lint, helm template, helm upgrade --install с разными values-файлами.",
            solution: `pipeline {
    agent { label 'k8s' }

    environment {
        APP = 'myapp'
        CHART = './charts/myapp'
    }

    stages {
        stage('Lint') {
            steps { sh "helm lint \${CHART}" }
        }
        stage('Deploy Staging') {
            when { expression { env.BRANCH_NAME == 'develop' } }
            steps {
                sh """
                    helm upgrade --install \${APP} \${CHART} \\
                        -n staging \\
                        -f \${CHART}/values-staging.yaml \\
                        --set image.tag=\${BUILD_NUMBER} \\
                        --wait --atomic
                """
            }
        }
        stage('Deploy Production') {
            when { expression { env.BRANCH_NAME == 'main' } }
            steps {
                input message: 'Deploy to production?'
                sh """
                    helm upgrade --install \${APP} \${CHART} \\
                        -n production \\
                        -f \${CHART}/values-prod.yaml \\
                        --set image.tag=\${BUILD_NUMBER} \\
                        --wait --atomic --history-max 10
                """
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Helm — пакетный менеджер для K8s",
          "Chart — набор шаблонов манифестов",
          "values.yaml — конфигурация через параметры",
          "helm upgrade --install --atomic — безопасный деплой",
          "Разные values-файлы для разных окружений",
          "helm rollback — быстрый откат"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 7: Тестирование в Jenkins
  // ═══════════════════════════════════════════
  {
    id: "module-7",
    title: "Тестирование в Jenkins",
    description: "Unit, Integration, E2E тесты, SonarQube, отчёты",
    icon: "🧪",
    lessons: [
      {
        id: "lesson-7-1",
        title: "Виды тестов в CI/CD",
        description: "Unit, Integration, E2E тесты и их запуск в Jenkins",
        theory: [
          "Пирамида тестирования: Unit (много, быстрые) → Integration (средне) → E2E (мало, медленные). В CI/CD важно соблюдать баланс — чем выше уровень, тем дороже и медленнее тест.",
          "Unit-тесты — проверка отдельных функций/методов. Быстрые (миллисекунды), изолированные (mock-зависимости). Запускаются при каждом коммите.",
          "Integration-тесты — проверка взаимодействия компонентов (API + БД, сервисы между собой). Требуют инфраструктуру (Docker Compose). Запускаются при каждом PR.",
          "E2E-тесты — проверка полного пользовательского сценария (браузер + API + БД). Медленные, хрупкие. Запускаются перед релизом или по ночам.",
          "Jenkins Step: junit — публикация результатов JUnit-тестов. Плагин читает XML-отчёты и показывает статистику: сколько тестов прошло, упало, пропущено.",
          "Coverage reports — отчёты о покрытии кода тестами. Публикуются через publishHTML плагин. Помогают отслеживать качество тестов."
        ],
        codeExamples: [
          {
            title: "Пайплайн с разными типами тестов",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit -- --coverage'
            }
            post {
                always {
                    junit 'test-results/unit/*.xml'
                    publishHTML([
                        reportName: 'Unit Test Coverage',
                        reportDir: 'coverage/unit/',
                        reportFiles: 'index.html',
                        allowMissing: true
                    ])
                }
            }
        }
        stage('Integration Tests') {
            steps {
                sh '''
                    docker-compose -f docker-compose.test.yml up -d
                    npm run test:integration
                '''
            }
            post {
                always {
                    junit 'test-results/integration/*.xml'
                    sh 'docker-compose -f docker-compose.test.yml down -v || true'
                }
            }
        }
        stage('E2E Tests') {
            when {
                anyOf {
                    branch 'main'
                    branch 'release/*'
                }
            }
            agent {
                docker {
                    image 'cypress/included:13.0.0'
                }
            }
            steps {
                sh 'cypress run --reporter junit'
            }
            post {
                always {
                    junit 'cypress/results/*.xml'
                    archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
                }
            }
        }
    }
}`
          },
          {
            title: "SonarQube анализ",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        SONAR_SCANNER_HOME = tool 'SonarScanner'
    }

    stages {
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        \${SONAR_SCANNER_HOME}/bin/sonar-scanner \\
                            -Dsonar.projectKey=my-project \\
                            -Dsonar.sources=src \\
                            -Dsonar.tests=tests \\
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \\
                            -Dsonar.test.inclusions=**/*.test.js \\
                            -Dsonar.exclusions=**/node_modules/**
                    """
                }
            }
        }
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте Pipeline с тремя типами тестов: Unit (всегда), Integration (с Docker Compose), E2E (только для main). Добавьте публикацию отчётов и coverage.",
            hint: "Используйте junit для публикации тестов, publishHTML для coverage, when для условного запуска E2E.",
            solution: `pipeline {
    agent any

    stages {
        stage('Unit Tests') {
            steps {
                sh 'npm run test:unit -- --coverage'
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
        stage('Integration Tests') {
            steps {
                sh 'docker-compose -f docker-compose.test.yml up -d'
                sh 'npm run test:integration'
            }
            post {
                always {
                    junit 'test-results/integration/*.xml'
                    sh 'docker-compose down -v || true'
                }
            }
        }
        stage('E2E Tests') {
            when { branch 'main' }
            steps {
                sh 'npx cypress run --reporter junit'
            }
            post {
                always {
                    junit 'cypress/results/*.xml'
                    archiveArtifacts 'cypress/screenshots/**'
                }
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Пирамида тестов: Unit → Integration → E2E",
          "junit — публикация результатов тестов",
          "publishHTML — отчёты о покрытии",
          "SonarQube — статический анализ кода",
          "waitForQualityGate — проверка порога качества",
          "archiveArtifacts — сохранение скриншотов/видео"
        ]
      },
      {
        id: "lesson-7-2",
        title: "Безопасность и качество кода",
        description: "Security scanning, linting, code quality",
        theory: [
          "Security scanning — автоматическая проверка кода на уязвимости. Включает: SAST (Static Application Security Testing), SCA (Software Composition Analysis), секретов в коде.",
          "SAST — анализ исходного кода на уязвимости (SQL injection, XSS, hardcoded credentials). Инструменты: SonarQube, Semgrep, Checkmarx.",
          "SCA — анализ зависимостей на известные уязвимости (CVE). Инструменты: npm audit, Snyk, OWASP Dependency-Check, Trivy.",
          "Secret scanning — обнаружение случайно коммиченных секретов (пароли, API-ключи, токены). Инструменты: GitLeaks, TruffleHog, detect-secrets.",
          "Docker image scanning — проверка Docker-образов на уязвимости в базовых образах и зависимостях. Инструменты: Trivy, Snyk Container, Anchore.",
          "Linting — проверка стиля кода и потенциальных ошибок. ESLint (JS), Pylint (Python), Checkstyle (Java). Должен быть частью CI — блокирует merge при ошибках."
        ],
        codeExamples: [
          {
            title: "Security Pipeline",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Dependency Scan') {
            steps {
                // npm audit
                sh 'npm audit --audit-level=high --production'
                
                // Или Snyk
                sh '''
                    snyk auth \${SNYK_TOKEN}
                    snyk test --severity-threshold=high
                '''
            }
        }
        stage('Secret Scan') {
            steps {
                sh '''
                    docker run --rm -v \\$(pwd):/code zricethezav/gitleaks \\
                        detect --source /code --verbose --redact
                '''
            }
        }
        stage('SAST') {
            steps {
                sh '''
                    docker run --rm -v \\$(pwd):/src returntocorp/semgrep \\
                        --config=auto /src
                '''
            }
        }
        stage('Docker Image Scan') {
            steps {
                sh 'docker build -t myapp:\${BUILD_NUMBER} .'
                sh '''
                    trivy image \\
                        --severity HIGH,CRITICAL \\
                        --exit-code 1 \\
                        --format table \\
                        myapp:\${BUILD_NUMBER}
                '''
            }
        }
        stage('License Check') {
            steps {
                sh '''
                    npx license-checker --summary --failOn "GPL-3.0;AGPL-3.0"
                '''
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте security pipeline: dependency scan (npm audit), secret scan (gitleaks), Docker image scan (trivy). Все сканы должны выполняться параллельно.",
            hint: "Используйте parallel { } для одновременного запуска всех сканов.",
            solution: `pipeline {
    agent { label 'docker' }

    stages {
        stage('Security Scans') {
            parallel {
                stage('Dependency Scan') {
                    steps {
                        sh 'npm audit --audit-level=high'
                    }
                }
                stage('Secret Scan') {
                    steps {
                        sh '''
                            docker run --rm -v \\$(pwd):/code \\
                                zricethezav/gitleaks detect \\
                                --source /code --verbose
                        '''
                    }
                }
                stage('SAST') {
                    steps {
                        sh '''
                            docker run --rm -v \\$(pwd):/src \\
                                returntocorp/semgrep --config=auto /src
                        '''
                    }
                }
            }
        }
        stage('Docker Build & Scan') {
            steps {
                sh 'docker build -t myapp:\${BUILD_NUMBER} .'
                sh '''
                    trivy image \\
                        --severity HIGH,CRITICAL \\
                        --exit-code 1 \\
                        myapp:\${BUILD_NUMBER}
                '''
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "SAST — анализ кода на уязвимости",
          "SCA — анализ зависимостей (npm audit, Snyk)",
          "Secret scanning — поиск секретов (GitLeaks)",
          "Docker scan — проверка образов (Trivy)",
          "Параллельные сканы ускоряют pipeline",
          "Блокировка при критических уязвимостях"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 8: Уведомления
  // ═══════════════════════════════════════════
  {
    id: "module-8",
    title: "Уведомления и интеграции",
    description: "Slack, Email, Telegram, интеграции с внешними сервисами",
    icon: "🔔",
    lessons: [
      {
        id: "lesson-8-1",
        title: "Slack и Email уведомления",
        description: "Настройка уведомлений о статусе сборок",
        theory: [
          "Уведомления — критически важная часть CI/CD. Команда должна знать о результатах сборок, особенно о неудачных. Jenkins поддерживает множество каналов уведомлений.",
          "Slack Notification — самый популярный канал для DevOps-команд. Плагин Slack Notification или httpRequest к Slack webhook. Можно настраивать цвет, эмодзи, кнопки.",
          "Email Extension — расширенный плагин для email-уведомлений. Поддерживает HTML-шаблоны, триггеры (always, failure, success), списки получателей.",
          "Telegram Bot — уведомления через Telegram Bot API. Простой curl-запрос к api.telegram.org. Удобно для мобильных уведомлений.",
          "Уведомления в post-блоке: always (всегда), success (успех), failure (неудача), unstable (нестабильно), changed (изменение статуса). Это позволяет гибко настраивать, когда отправлять.",
          "Best practices: не спамить уведомлениями (только failure и changed), использовать цвета для быстрой идентификации, включать ссылки на build log."
        ],
        codeExamples: [
          {
            title: "Slack уведомления",
            language: "groovy",
            code: `pipeline {
    agent any

    stages {
        stage('Build') {
            steps { sh 'npm run build' }
        }
    }

    post {
        success {
            slackSend(
                channel: '#deployments',
                color: 'good',
                message: """
                    ✅ *Build Successful*
                    *Job:* \${env.JOB_NAME}
                    *Build:* #\${env.BUILD_NUMBER}
                    *Branch:* \${env.BRANCH_NAME}
                    *Duration:* \${currentBuild.durationString}
                    *Link:* <\${env.BUILD_URL}|Open Build>
                """.stripIndent()
            )
        }
        failure {
            slackSend(
                channel: '#deployments',
                color: 'danger',
                message: """
                    ❌ *Build Failed*
                    *Job:* \${env.JOB_NAME}
                    *Build:* #\${env.BUILD_NUMBER}
                    *Branch:* \${env.BRANCH_NAME}
                    *Error:* \${currentBuild.currentResult}
                    *Link:* <\${env.BUILD_URL}|View Logs>
                    cc: @channel
                """.stripIndent()
            )
        }
        unstable {
            slackSend(
                channel: '#deployments',
                color: 'warning',
                message: "⚠️ *Unstable:* \${env.JOB_NAME} #\${env.BUILD_NUMBER}"
            )
        }
    }
}`
          },
          {
            title: "Telegram уведомления через HTTP",
            language: "groovy",
            code: `pipeline {
    agent any

    environment {
        TELEGRAM_BOT_TOKEN = credentials('telegram-bot-token')
        TELEGRAM_CHAT_ID = '-1001234567890'
    }

    stages {
        stage('Build') {
            steps { sh 'npm run build' }
        }
    }

    post {
        success {
            script {
                def message = """
✅ Build Successful
📦 \${env.JOB_NAME} #\${env.BUILD_NUMBER}
🌿 \${env.BRANCH_NAME}
⏱ \${currentBuild.durationString}
                """.stripIndent()
                
                httpRequest(
                    url: "https://api.telegram.org/bot\${TELEGRAM_BOT_TOKEN}/sendMessage",
                    httpMode: 'POST',
                    contentType: 'APPLICATION_JSON',
                    requestBody: """
                        {
                            "chat_id": "\${TELEGRAM_CHAT_ID}",
                            "text": "\${message}",
                            "parse_mode": "HTML"
                        }
                    """
                )
            }
        }
        failure {
            script {
                def message = """
❌ Build Failed!
📦 \${env.JOB_NAME} #\${env.BUILD_NUMBER}
🔗 \${env.BUILD_URL}console
                """.stripIndent()
                
                sh """
                    curl -s -X POST \\
                        "https://api.telegram.org/bot\${TELEGRAM_BOT_TOKEN}/sendMessage" \\
                        -H "Content-Type: application/json" \\
                        -d '{
                            "chat_id": "\${TELEGRAM_CHAT_ID}",
                            "text": "\${message}"
                        }'
                """
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте универсальную функцию notifyTeam.groovy (Shared Library), которая отправляет уведомления в Slack и Telegram одновременно. Функция должна принимать status, message и дополнительные параметры.",
            hint: "Создайте файл vars/notifyTeam.groovy с def call(Map config). Внутри вызывайте slackSend и httpRequest для Telegram.",
            solution: `// vars/notifyTeam.groovy
def call(Map config = [:]) {
    def status = config.status ?: 'UNKNOWN'
    def message = config.message ?: ''
    def jobName = env.JOB_NAME
    def buildNumber = env.BUILD_NUMBER
    def buildUrl = env.BUILD_URL
    def branch = env.BRANCH_NAME ?: 'N/A'
    
    def emoji = [
        'SUCCESS': '✅',
        'FAILURE': '❌',
        'UNSTABLE': '⚠️',
        'ABORTED': '🛑'
    ].getOrDefault(status, 'ℹ️')
    
    def color = [
        'SUCCESS': 'good',
        'FAILURE': 'danger',
        'UNSTABLE': 'warning'
    ].getOrDefault(status, '#808080')
    
    def fullMessage = """
\${emoji} *\${status}*
*Job:* \${jobName} #\${buildNumber}
*Branch:* \${branch}
*Message:* \${message}
*Duration:* \${currentBuild.durationString}
*Link:* <\${buildUrl}|View Build>
    """.stripIndent()
    
    // Slack
    try {
        slackSend(
            channel: config.slackChannel ?: '#ci-cd',
            color: color,
            message: fullMessage
        )
    } catch (Exception e) {
        echo "Slack notification failed: \${e.message}"
    }
    
    // Telegram
    try {
        withCredentials([string(credentialsId: 'telegram-bot-token', variable: 'TG_TOKEN')]) {
            sh """
                curl -s -X POST \\
                    "https://api.telegram.org/bot\${TG_TOKEN}/sendMessage" \\
                    -H "Content-Type: application/json" \\
                    -d '{
                        "chat_id": "\${config.telegramChatId ?: env.TELEGRAM_CHAT_ID}",
                        "text": "\${emoji} \${status}\\n\${jobName} #\${buildNumber}\\n\${message}"
                    }'
            """
        }
    } catch (Exception e) {
        echo "Telegram notification failed: \${e.message}"
    }
}`
          }
        ],
        keyPoints: [
          "slackSend — уведомления в Slack",
          "httpRequest — универсальный HTTP-клиент",
          "Telegram Bot API — мобильные уведомления",
          "post { } — триггеры уведомлений",
          "Цвета и эмодзи для быстрой идентификации",
          "try/catch — уведомления не должны ломать пайплайн"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 9: Безопасность
  // ═══════════════════════════════════════════
  {
    id: "module-9",
    title: "Безопасность Jenkins",
    description: "Credentials, секреты, безопасность пайплайнов",
    icon: "🔒",
    lessons: [
      {
        id: "lesson-9-1",
        title: "Управление секретами",
        description: "Credentials, Vault, безопасные пайплайны",
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

    stages {
        stage('Deploy') {
            steps {
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
                        set +x  # Disable echo
                        curl -u "\${DEPLOY_USER}:\${DEPLOY_PASS}" \\
                            https://api.example.com/deploy
                        
                        ssh -i "\${SSH_KEY_PATH}" user@server 'deploy.sh'
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
                        set +x
                        ./deploy-with-secrets.sh
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
            task: "Создайте Pipeline, который безопасно получает секреты из credentials, использует их для деплоя и гарантирует, что секреты не попадут в логи. Добавьте валидацию параметров.",
            hint: "Используйте withCredentials() и set +x для отключения echo. Валидируйте параметры через expression.",
            solution: `pipeline {
    agent any

    parameters {
        choice(
            name: 'ENV',
            choices: ['staging', 'production'],
            description: 'Target environment'
        )
        string(
            name: 'VERSION',
            description: 'Version (semver)',
            trim: true
        )
    }

    stages {
        stage('Validate') {
            steps {
                script {
                    if (!params.VERSION?.matches(/^\\d+\\.\\d+\\.\\d+$/)) {
                        error "Invalid version: \${params.VERSION}"
                    }
                    if (params.ENV == 'production') {
                        input message: "Deploy to PRODUCTION?",
                              submitter: 'admin,tech-lead'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: "\${params.ENV}-creds",
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh """
                        set +x
                        ./deploy.sh \\
                            --env \${params.ENV} \\
                            --version \${params.VERSION} \\
                            --user "\${USER}" \\
                            --pass "\${PASS}"
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
          "withCredentials() — безопасное использование",
          "Vault — внешнее хранение секретов",
          "set +x — отключение echo для секретов",
          "Валидация параметров предотвращает ошибки",
          "Audit Trail — логирование всех действий"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 10: Troubleshooting
  // ═══════════════════════════════════════════
  {
    id: "module-10",
    title: "Troubleshooting и отладка",
    description: "Диагностика проблем, отладка пайплайнов, логи",
    icon: "🔍",
    lessons: [
      {
        id: "lesson-10-1",
        title: "Отладка пайплайнов",
        description: "Типичные ошибки, debug-режим, логи",
        theory: [
          "Отладка Jenkins Pipeline — ключевой навык. Основные источники информации: console output (логи сборки), pipeline steps view (визуализация шагов), Blue Ocean UI.",
          "Типичные ошибки: syntax error в Jenkinsfile (проверяйте через Replay), credential not found (проверьте ID credentials), agent not available (проверьте labels и статус агента).",
          "Debug-режим: добавьте sh 'set -x' для вывода всех команд с аргументами. Используйте echo для вывода переменных. Pipeline: debug flags в Jenkins UI.",
          "Replay — функция для быстрого повторного запуска пайплайна с изменённым Jenkinsfile. Не требует коммита — идеально для отладки.",
          "Pipeline Syntax — встроенный генератор сниппетов (http://jenkins/pipeline-syntax/). Позволяет интерактивно собрать любой step и получить готовый код.",
          "Логи Jenkins: /var/log/jenkins/jenkins.log (системные), console output каждого build (через UI). При проблемах с запуском — проверяйте системный лог."
        ],
        codeExamples: [
          {
            title: "Debug Pipeline",
            language: "groovy",
            code: `pipeline {
    agent any

    options {
        // Включаем подробные логи
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        DEBUG = 'true'
    }

    stages {
        stage('Debug Info') {
            steps {
                // Выводим всю полезную информацию
                script {
                    echo "=== Build Info ==="
                    echo "Job: \${env.JOB_NAME}"
                    echo "Build: #\${env.BUILD_NUMBER}"
                    echo "Branch: \${env.BRANCH_NAME}"
                    echo "Commit: \${env.GIT_COMMIT}"
                    echo "Workspace: \${env.WORKSPACE}"
                    echo "Node: \${env.NODE_NAME}"
                    echo "Java: \${sh(script: 'java -version', returnStdout: true)}"
                    echo "Docker: \${sh(script: 'docker --version', returnStdout: true)}"
                    echo "Disk: \${sh(script: 'df -h', returnStdout: true)}"
                    echo "Memory: \${sh(script: 'free -h', returnStdout: true)}"
                }
            }
        }
        stage('Build with Debug') {
            steps {
                // set -x выводит все команды
                sh '''
                    set -x
                    set -e  # Exit on error
                    
                    echo "Starting build..."
                    npm ci --verbose
                    npm run build 2>&1 | tee build.log
                '''
            }
        }
        stage('Error Handling') {
            steps {
                script {
                    try {
                        sh 'risky-command.sh'
                    } catch (Exception e) {
                        echo "ERROR: \${e.message}"
                        echo "Stack: \${e.stackTrace.join('\\n')}"
                        
                        // Сохраняем debug info
                        sh 'env | sort > debug-env.txt'
                        sh 'cat /var/log/syslog | tail -50 > debug-syslog.txt'
                        
                        archiveArtifacts 'debug-*.txt'
                        
                        // Решаем: продолжить или упасть
                        error "Build failed: \${e.message}"
                    }
                }
            }
        }
    }
}`
          },
          {
            title: "Частые ошибки и решения",
            language: "text",
            code: `═══════════════════════════════════════════════════════════════
              ЧАСТЫЕ ОШИБКИ JENKINS И РЕШЕНИЯ
═══════════════════════════════════════════════════════════════

❌ "No such DSL method 'stageNamed'"
   → Опечатка в названии директивы. Проверьте документацию.

❌ "CredentialsId not found: xxx"
   → Проверьте ID в Manage Jenkins → Credentials.
   → Убедитесь, что credentials доступны для данного folder/project.

❌ "No node matches label: xxx"
   → Агент с таким label не подключен.
   → Проверьте Manage Jenkins → Nodes.

❌ "script not approved"
   → Script Security блокирует опасную операцию.
   → Manage Jenkins → In-process Script Approval → Approve.

❌ "java.lang.OutOfMemoryError"
   → Увеличьте heap: JAVA_OPTS="-Xmx2g"
   → Уменьшите executors на контроллере.

❌ "Timeout waiting for agent"
   → Агент не может подключиться к контроллеру.
   → Проверьте сеть, firewall, URL контроллера.

❌ "Docker: permission denied"
   → Jenkins user не в docker group.
   → sudo usermod -aG docker jenkins

❌ Pipeline не запускается после push
   → Проверьте webhook URL и настройки.
   → Проверьте credentials для доступа к репозиторию.
   → Проверьте Jenkinsfile в корне репозитория.`
          }
        ],
        practice: [
          {
            task: "Создайте debug-пайплайн, который: 1) Выводит всю информацию об окружении, 2) Запускает команду с try/catch, 3) При ошибке сохраняет debug-информацию и отправляет уведомление.",
            hint: "Используйте env.*, sh для системной информации, try/catch для обработки ошибок, archiveArtifacts для сохранения логов.",
            solution: `pipeline {
    agent any

    options { timestamps() }

    stages {
        stage('Environment Debug') {
            steps {
                script {
                    echo "=== Environment ==="
                    env.getEnvironment().each { k, v ->
                        echo "\${k}=\${v}"
                    }
                    echo "=== System Info ==="
                    sh 'uname -a'
                    sh 'df -h'
                    sh 'free -h'
                    sh 'docker info 2>/dev/null || echo "Docker not available"'
                }
            }
        }
        stage('Risky Operation') {
            steps {
                script {
                    try {
                        sh 'set -x && ./build-and-deploy.sh'
                    } catch (Exception e) {
                        echo "❌ FAILED: \${e.message}"
                        
                        // Save debug info
                        sh 'env | sort > debug-env.txt'
                        sh 'dmesg | tail -20 > debug-dmesg.txt'
                        sh 'docker system df > debug-docker.txt 2>&1'
                        
                        archiveArtifacts 'debug-*.txt'
                        
                        // Notify
                        slackSend(
                            channel: '#alerts',
                            color: 'danger',
                            message: 'Build failed: ' + e.message
                        )
                        error 'Pipeline failed'
                        // notification sent \${e.message}\\n\\${env.BUILD_URL}"
                        )
                        
                        error 'Pipeline failed'
                    }
                }
            }
        }
    }
}`
          }
        ],
        keyPoints: [
          "Replay — быстрый перезапуск с изменениями",
          "set -x — вывод всех команд",
          "try/catch — обработка ошибок",
          "archiveArtifacts — сохранение debug-информации",
          "Pipeline Syntax — генератор сниппетов",
          "timestamps() — временные метки в логах"
        ]
      }
    ]
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 11: DevOps Best Practices
  // ═══════════════════════════════════════════
  {
    id: "module-11",
    title: "DevOps Best Practices",
    description: "Production-ready пайплайны, GitOps, реальные сценарии",
    icon: "🏆",
    lessons: [
      {
        id: "lesson-11-1",
        title: "Production-ready CI/CD",
        description: "Полноценный пайплайн от коммита до продакшна",
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
    }

    parameters {
        choice(name: 'DEPLOY_ENV', choices: ['staging', 'production'])
    }

    stages {
        stage('Checkout') {
            agent { label 'docker' }
            steps {
                checkout scm
                script {
                    env.COMMIT = sh(script:'git rev-parse --short HEAD',
                        returnStdout:true).trim()
                }
            }
        }
        stage('Lint & Analysis') {
            agent { docker { image 'sonarsource/sonar-scanner-cli' } }
            steps { sh 'sonar-scanner' }
        }
        stage('Build & Test') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                sh 'npm ci'
                sh 'npm run lint'
                sh 'npm test -- --coverage'
                sh 'npm run build'
            }
            post {
                always {
                    junit 'test-results/*.xml'
                }
            }
        }
        stage('Security') {
            agent { docker { image 'aquasec/trivy:latest' } }
            parallel {
                stage('Dependency Scan') {
                    steps { sh 'trivy fs --severity HIGH,CRITICAL .' }
                }
                stage('Secret Scan') {
                    steps { sh 'gitleaks detect --source .' }
                }
            }
        }
        stage('Docker') {
            agent { label 'docker' }
            steps {
                script {
                    def img = "\${REGISTRY}/\${APP_NAME}:\${env.COMMIT}"
                    docker.build(img)
                    sh "trivy image --severity HIGH,CRITICAL \${img}"
                    docker.withRegistry("https://\${REGISTRY}", 'creds') {
                        docker.image(img).push()
                    }
                }
            }
        }
        stage('Deploy Staging') {
            when { expression { params.DEPLOY_ENV == 'staging' || env.BRANCH_NAME == 'develop' } }
            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} ./chart \\
                            --namespace staging \\
                            --set image.tag=\${env.COMMIT} \\
                            --wait --atomic
                    """
                }
            }
        }
        stage('Smoke Tests') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps { sh 'newman run tests/smoke.json' }
        }
        stage('Deploy Production') {
            when { expression { params.DEPLOY_ENV == 'production' } }
            steps {
                input message: "Deploy \${env.COMMIT} to production?",
                      submitter: 'admin,tech-lead'
            }
            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} ./chart \\
                            --namespace production \\
                            --set image.tag=\${env.COMMIT} \\
                            --set replicas=3 \\
                            --wait --atomic --timeout 10m
                    """
                }
            }
        }
    }

    post {
        success {
            notifyTeam(status: 'SUCCESS', message: "Deployed \${env.COMMIT}")
        }
        failure {
            notifyTeam(status: 'FAILURE', message: "Failed at \${currentBuild.currentResult}")
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Спроектируйте полный CI/CD пайплайн для микросервиса. Определите этапы, стратегии тестирования, деплоя и отката. Напишите Jenkinsfile.",
            hint: "Включите: lint, build, test, security, docker, deploy staging, smoke test, deploy production, monitoring.",
            solution: `// Полный CI/CD пайплайн для микросервиса
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
                    env.COMMIT = sh(script:'git rev-parse --short HEAD',
                        returnStdout:true).trim()
                }
            }
        }
        stage('Build & Test') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                sh 'npm ci && npm run lint && npm test && npm run build'
            }
        }
        stage('Security') {
            agent { docker { image 'aquasec/trivy:latest' } }
            steps { sh 'trivy fs --severity HIGH,CRITICAL .' }
        }
        stage('Docker') {
            agent { label 'docker' }
            steps {
                script {
                    docker.build("app:\${env.COMMIT}")
                    docker.withRegistry('https://registry.example.com', 'creds') {
                        docker.image("app:\${env.COMMIT}").push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }
            steps {
                container('helm') {
                    sh 'helm upgrade --install app ./chart --set image.tag=\${COMMIT} --atomic --wait'
                }
            }
        }
    }
    post {
        failure {
            notifyTeam(status: 'FAILURE', message: 'Build failed!')
        }
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
        id: "lesson-11-2",
        title: "GitOps и Jenkins",
        description: "GitOps подход, ArgoCD + Jenkins",
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
        MANIFESTS_REPO = 'git@github.com:org/k8s-manifests.git'
    }

    stages {
        stage('CI: Build & Test') {
            steps {
                sh 'npm ci && npm test && npm run build'
                sh 'docker build -t registry/app:\${BUILD_NUMBER} .'
                sh 'docker push registry/app:\${BUILD_NUMBER}'
            }
        }
        stage('CD: Update Manifests') {
            steps {
                sshagent(['git-ssh-key']) {
                    sh """
                        git clone \${MANIFESTS_REPO} manifests
                        cd manifests
                        sed -i 's|tag:.*|tag: "\${BUILD_NUMBER}"|' \\
                            environments/staging/values.yaml
                        git checkout -b update-\${APP_NAME}-\${BUILD_NUMBER}
                        git add .
                        git commit -m "chore: update \${APP_NAME} to \${BUILD_NUMBER}"
                        git push origin update-\${APP_NAME}-\${BUILD_NUMBER}
                        gh pr create --title "Update \${APP_NAME}" --body "Auto-update"
                    """
                }
            }
        }
        stage('Wait for ArgoCD') {
            steps {
                sh 'argocd app wait \${APP_NAME} --timeout 300 --health --sync'
            }
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Опишите архитектуру CI/CD с Jenkins + ArgoCD. Как происходит промоушн от staging до production?",
            hint: "Jenkins = CI (build, test, push image). ArgoCD = CD (sync manifests). Промоушн через PR.",
            solution: `Архитектура Jenkins + ArgoCD:

1. Developer pushes code → Jenkins triggers CI
2. Jenkins: lint → test → build image → push to registry
3. Jenkins: updates image tag in k8s-manifests repo (creates PR)
4. PR reviewed & merged → ArgoCD detects change
5. ArgoCD syncs staging → smoke tests pass
6. Jenkins creates PR for production manifests
7. Tech lead approves PR → ArgoCD syncs production
8. ArgoCD health checks verify deployment

Преимущества:
- Полный аудит через Git history
- Откат через git revert
- Разделение CI и CD
- Нет прямого доступа к кластеру из Jenkins
- Self-healing: ArgoCD исправляет drift`
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
  },
  // ═══════════════════════════════════════════
  // МОДУЛЬ 12: Финальный проект
  // ═══════════════════════════════════════════
  {
    id: "module-12",
    title: "Финальный проект",
    description: "Capstone project — создание полноценной CI/CD системы",
    icon: "🎓",
    lessons: [
      {
        id: "lesson-12-1",
        title: "Capstone Project: Часть 1",
        description: "Проектирование CI/CD системы для реального проекта",
        theory: [
          "Финальный проект — создание полноценной CI/CD системы для микросервисного приложения. Вы примените все знания, полученные в курсе.",
          "Требования к проекту: автоматическая сборка при push, тестирование (unit + integration + e2e), security scanning, Docker-образ, деплой в Kubernetes, мониторинг, уведомления.",
          "Архитектура решения: Jenkins controller + динамические K8s агенты, Git-репозиторий с Jenkinsfile, Helm chart для приложения, ArgoCD для GitOps.",
          "Структура репозитория: src/ (код приложения), tests/ (тесты), charts/ (Helm chart), k8s/ (Kubernetes манифесты), Jenkinsfile, .github/ (шаблоны PR).",
          "Критерии качества: пайплайн проходит за <15 минут, все тесты зелёные, нет критических уязвимостей, деплой автоматический на staging, ручной на production.",
          "Документация: README.md с описанием проекта, архитектурой, инструкциями по запуску. Onboarding guide для новых разработчиков."
        ],
        codeExamples: [
          {
            title: "Структура проекта",
            language: "text",
            code: `my-microservice/
├── src/                      # Исходный код
│   ├── index.js
│   ├── routes/
│   ├── services/
│   └── middleware/
├── tests/
│   ├── unit/                 # Unit тесты
│   ├── integration/          # Integration тесты
│   └── e2e/                  # E2E тесты
├── charts/                   # Helm chart
│   └── my-service/
│       ├── Chart.yaml
│       ├── values.yaml
│       ├── values-staging.yaml
│       ├── values-production.yaml
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── ingress.yaml
│           └── hpa.yaml
├── k8s/                      # K8s manifests
│   └── jenkins-agent.yaml
├── docker/
│   ├── Dockerfile
│   └── Dockerfile.dev
├── Jenkinsfile               # CI/CD Pipeline
├── .sonarcloud.properties    # SonarQube config
├── docker-compose.yml        # Local development
├── docker-compose.test.yml   # Test environment
├── package.json
└── README.md`
          },
          {
            title: "Полный Jenkinsfile",
            language: "groovy",
            code: `@Library('company-pipeline@v3.0') _

pipeline {
    agent none

    options {
        timeout(time: 45, unit: 'MINUTES')
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    environment {
        REGISTRY = 'registry.company.com'
        APP_NAME = 'my-service'
        HELM_CHART = './charts/my-service'
        SONAR_PROJECT = 'company_my-service'
    }

    parameters {
        choice(name: 'TARGET_ENV', choices: ['staging', 'production'])
        booleanParam(name: 'SKIP_E2E', defaultValue: false,
            description: 'Skip E2E tests')
    }

    stages {
        stage('Initialize') {
            agent { label 'jenkins-agent' }
            steps {
                checkout scm
                script {
                    env.COMMIT = sh(script: 'git rev-parse --short HEAD',
                        returnStdout: true).trim()
                    env.TAG = "\${env.COMMIT}"
                    env.IMAGE = "\${REGISTRY}/\${APP_NAME}:\${env.TAG}"
                }
            }
        }

        stage('Quality Gate') {
            parallel {
                stage('Lint') {
                    agent { docker { image 'node:18-alpine' } }
                    steps {
                        sh 'npm ci'
                        sh 'npm run lint'
                    }
                }
                stage('SonarQube') {
                    agent { docker { image 'sonarsource/sonar-scanner-cli' } }
                    steps {
                        withSonarQubeEnv('SonarCloud') {
                            sh "sonar-scanner -Dsonar.projectKey=\${SONAR_PROJECT}"
                        }
                    }
                }
                stage('Security Scan') {
                    agent { docker { image 'aquasec/trivy:latest' } }
                    steps {
                        sh 'trivy fs --severity HIGH,CRITICAL --exit-code 1 .'
                    }
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    agent { docker { image 'node:18-alpine' } }
                    steps {
                        sh 'npm ci'
                        sh 'npm run test:unit -- --coverage'
                    }
                    post {
                        always {
                            junit 'coverage/test-results/unit/*.xml'
                            publishHTML target: [
                                reportName: 'Coverage Report',
                                reportDir: 'coverage/lcov-report',
                                reportFiles: 'index.html'
                            ]
                        }
                    }
                }
                stage('Integration Tests') {
                    agent { label 'docker' }
                    steps {
                        sh 'docker-compose -f docker-compose.test.yml up -d'
                        sh 'npm ci && npm run test:integration'
                    }
                    post {
                        always {
                            junit 'test-results/integration/*.xml'
                            sh 'docker-compose -f docker-compose.test.yml down -v || true'
                        }
                    }
                }
            }
        }

        stage('E2E Tests') {
            when {
                allOf {
                    expression { !params.SKIP_E2E }
                    anyOf {
                        branch 'main'
                        branch 'release/*'
                    }
                }
            }
            agent { docker { image 'cypress/included:13.0.0' } }
            steps {
                sh 'cypress run --reporter junit --reporter-options "mochaFile=results/e2e.xml"'
            }
            post {
                always {
                    junit 'results/e2e.xml'
                    archiveArtifacts artifacts: 'cypress/screenshots/**',
                        allowEmptyArchive: true
                }
            }
        }

        stage('Quality Gate Check') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Docker Build & Push') {
            agent { label 'docker' }
            steps {
                script {
                    docker.build("\${IMAGE}", "--build-arg VERSION=\${TAG} .")
                    sh "trivy image --severity HIGH,CRITICAL --exit-code 1 \${IMAGE}"
                    docker.withRegistry("https://\${REGISTRY}", 'registry-creds') {
                        docker.image("\${IMAGE}").push()
                        docker.image("\${IMAGE}").push('latest')
                    }
                }
            }
        }

        stage('Deploy Staging') {
            when {
                anyOf {
                    branch 'main'
                    branch 'develop'
                    expression { params.TARGET_ENV == 'staging' }
                }
            }
            agent { kubernetes { yamlFile 'k8s/jenkins-agent.yaml' } }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} \${HELM_CHART} \\
                            --namespace staging \\
                            -f \${HELM_CHART}/values-staging.yaml \\
                            --set image.repository=\${REGISTRY}/\${APP_NAME} \\
                            --set image.tag=\${TAG} \\
                            --wait --timeout 5m --atomic
                    """
                }
            }
        }

        stage('Smoke Tests') {
            when { branch 'main' }
            steps {
                sh """
                    sleep 10
                    curl -sf https://staging.company.com/health | jq .
                """
            }
        }

        stage('Deploy Production') {
            when {
                allOf {
                    branch 'main'
                    expression { params.TARGET_ENV == 'production' }
                }
            }
            steps {
                input message: """
                    🚀 PRODUCTION DEPLOYMENT
                    Image: \${IMAGE}
                    Commit: \${COMMIT}
                    Approve deployment?
                """, ok: 'Deploy', submitter: 'admin,tech-lead'
            }
            agent { kubernetes { yamlFile 'k8s/jenkins-agent.yaml' } }
            steps {
                container('helm') {
                    sh """
                        helm upgrade --install \${APP_NAME} \${HELM_CHART} \\
                            --namespace production \\
                            -f \${HELM_CHART}/values-production.yaml \\
                            --set image.repository=\${REGISTRY}/\${APP_NAME} \\
                            --set image.tag=\${TAG} \\
                            --set replicas=3 \\
                            --wait --timeout 10m --atomic
                    """
                }
            }
        }

        stage('Post-Deploy Verification') {
            when { branch 'main' }
            steps {
                script {
                    sleep(time: 30, unit: 'SECONDS')
                    sh """
                        for i in 1 2 3 4 5; do
                            STATUS=\\\$(curl -s -o /dev/null -w '%{http_code}' \\
                                https://app.company.com/health)
                            [ "\\\$STATUS" = "200" ] && echo "✅ Health OK" && exit 0
                            echo "Attempt \\\$i: status \\\$STATUS"
                            sleep 10
                        done
                        exit 1
                    """
                }
            }
        }
    }

    post {
        always { cleanWs() }
        success {
            notifyTeam(
                status: 'SUCCESS',
                message: "\${APP_NAME} \${env.TAG} deployed to \${params.TARGET_ENV}",
                slackChannel: '#deployments'
            )
        }
        failure {
            notifyTeam(
                status: 'FAILURE',
                message: "\${APP_NAME} failed at: \${currentBuild.currentResult}",
                slackChannel: '#alerts'
            )
        }
    }
}`
          }
        ],
        practice: [
          {
            task: "Создайте полный CI/CD пайплайн для вашего проекта (или учебного). Включите все этапы: lint, test, security, docker, deploy, verification, notifications. Используйте все изученные практики.",
            hint: "Начните с простого, затем добавляйте этапы. Используйте Shared Library для переиспользования. Тестируйте через Replay.",
            solution: `// Минимальный production-ready пайплайн
@Library('shared-lib@v1.0') _

pipeline {
    agent none
    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }
    environment {
        IMAGE = "registry.io/app:\${env.BUILD_NUMBER}"
    }
    stages {
        stage('Build & Test') {
            agent { docker { image 'node:18-alpine' } }
            steps {
                checkout scm
                sh 'npm ci && npm run lint && npm test && npm run build'
            }
        }
        stage('Security') {
            agent { docker { image 'aquasec/trivy:latest' } }
            steps { sh 'trivy fs --severity HIGH,CRITICAL .' }
        }
        stage('Docker') {
            agent { label 'docker' }
            steps {
                script {
                    docker.build("\${IMAGE}")
                    sh "trivy image --exit-code 1 \${IMAGE}"
                    docker.withRegistry('https://registry.io', 'creds') {
                        docker.image("\${IMAGE}").push()
                    }
                }
            }
        }
        stage('Deploy') {
            agent { kubernetes { yamlFile 'k8s/agent.yaml' } }
            steps {
                container('helm') {
                    sh 'helm upgrade --install app ./chart --set image.tag=\${BUILD_NUMBER} --atomic --wait'
                }
            }
        }
    }
    post {
        success { notifyTeam(status: 'SUCCESS') }
        failure { notifyTeam(status: 'FAILURE') }
    }
}

// Чеклист:
// ✅ Lint + форматирование
// ✅ Unit + Integration тесты
// ✅ Security scanning (deps + secrets + image)
// ✅ Docker build + push
// ✅ Deploy с Helm
// ✅ Health check после деплоя
// ✅ Уведомления
// ✅ Rollback при неудаче (--atomic)
// ✅ Build history cleanup`
          }
        ],
        keyPoints: [
          "Полный цикл: code → test → build → deploy → verify",
          "Shared Library для переиспользования",
          "Параллельные stages для скорости",
          "Security на каждом этапе",
          "Автоматический rollback (--atomic)",
          "Уведомления и мониторинг"
        ]
      }
    ]
  }
];
