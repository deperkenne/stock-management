export const projectContext = {
  domain: "Order Management (WMS)",

  architecture: {
    backend: "Spring Boot",
    frontend: "React TypeScript",
    messaging: "Kafka",
    cache: "Redis",
    database: "PostgreSQL",
    auth: "Keycloak (OIDC)"
  },

  auth: {
    provider: "Keycloak",
    protocol: "OpenID Connect (OIDC)",
    tokenType: "JWT",

    frontendFlow: [
      "Login redirect to Keycloak",
      "Receive access token",
      "Store token (memory/sessionStorage)",
      "Attach token to API requests"
    ],

    backendFlow: [
      "Validate JWT via Spring Security",
      "Extract roles from token",
      "Authorize endpoints via roles"
    ],

    roles: [
      "ADMIN",
      "USER",
      "WAREHOUSE_MANAGER"
    ]
  },

  frontend: {
    framework: "React TS",

    authIntegration: [
      "Keycloak login redirect",
      "Token storage (sessionStorage)",
      "Axios interceptor for Authorization header"
    ],

    mainModules: [
      "OrderPage",
      "OrderDetails",
      "CreateOrderForm"
    ],

    apiLayer: ["orderApi.ts"],

    backendIntegration: [
      "GET /orders",
      "POST /orders"
    ]
  },

  entities: {
    Order: ["id", "sku", "status"]
  },

  coreServices: [
    "OrderService",
    "OrderController",
    "OrderRepository",
    "KafkaConsumer",
    "KeycloakSecurityConfig"
  ],

  rules: [
    "PostgreSQL = source of truth",
    "Kafka = event bus",
    "Redis = distributed lock",
    "Frontend communicates only via REST API",
    "All endpoints secured via Keycloak JWT",
    "Role-based access control (RBAC) required"
  ]
};