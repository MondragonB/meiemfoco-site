// MEI em Foco - Service Worker
// Projeto de extensão da Universidade de Vassouras - Campus Maricá
// Desenvolvido por: Diogo Santana Cardoso

const CACHE_NAME = 'mei-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/css/main.min.css',
  '/js/main.min.js',
  '/css/variables.css',
  '/css/base.css',
  '/css/components.css',
  '/css/responsive.css',
  '/css/utils.css',
  '/css/autoria-protecao.css',
  '/js/main.js',
  '/js/faq.js',
  '/js/autoria-protecao.js',
  '/images/logos/universidade-de-vassouras-seeklogo.svg',
  '/offline.html'
];

// Instalação do Service Worker - Estratégia Cache-First
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto e otimizado');
        return cache.addAll(ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker com limpeza de caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Removendo cache antigo:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições com estratégia Cache-First
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache se estiver disponível (Cache First)
        if (response) {
          return response;
        }
        
        // Caso contrário, busca na rede
        return fetch(event.request)
          .then(networkResponse => {
            // Se a resposta não for válida, retorna
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clona a resposta para armazenar no cache
            const responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return networkResponse;
          })
          .catch(() => {
            // Se falhar ao buscar na rede, retorna a página offline
            if (event.request.mode === 'navigate') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'sync-form-data') {
    event.waitUntil(syncFormData());
  }
});

// Função para sincronizar dados de formulários
async function syncFormData() {
  try {
    const db = await openDB();
    const pendingData = await db.getAll('pending-forms');
    
    for (const data of pendingData) {
      try {
        const response = await fetch('/api/submit-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          await db.delete('pending-forms', data.id);
        }
      } catch (error) {
        console.error('Erro ao sincronizar dados:', error);
      }
    }
  } catch (error) {
    console.error('Erro ao acessar o banco de dados:', error);
  }
}

// Função para abrir o banco de dados IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mei-em-foco-db', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('pending-forms')) {
        db.createObjectStore('pending-forms', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Notificações push
self.addEventListener('push', event => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/images/logos/universidade-de-vassouras-seeklogo.svg',
    badge: '/images/notification-badge.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        const url = event.notification.data.url;
        
        // Verificar se já existe uma janela aberta e focar nela
        for (const client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Caso contrário, abrir uma nova janela
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});
