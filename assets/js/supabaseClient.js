// assets/js/supabaseClient.js
// ADAPTAÇÃO: Usando IndexedDB para Custo Zero, mantendo nome do arquivo caso migre depois.

const DB_NAME = 'ManzuaHotelDB';
const DB_VERSION = 1;

export const db = {
    // Inicializa o banco
    init: () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = (e) => {
                const database = e.target.result;
                if (!database.objectStoreNames.contains('bookings')) {
                    database.createObjectStore('bookings', { keyPath: 'id', autoIncrement: true });
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject("Erro ao abrir banco");
        });
    },
    // Adicionar Reserva
    insert: async (table, data) => {
        const database = await db.init();
        return new Promise((resolve) => {
            const tx = database.transaction(table, 'readwrite');
            const store = tx.objectStore(table);
            store.add(data);
            tx.oncomplete = () => resolve({ data, error: null });
        });
    },
    // Ler Reservas
    select: async (table) => {
        const database = await db.init();
        return new Promise((resolve) => {
            const tx = database.transaction(table, 'readonly');
            const store = tx.objectStore(table);
            const request = store.getAll();
            request.onsuccess = () => resolve({ data: request.result, error: null });
        });
    },
    // Atualizar
    update: async (table, id, updates) => {
        const database = await db.init();
        return new Promise((resolve) => {
            const tx = database.transaction(table, 'readwrite');
            const store = tx.objectStore(table);
            const req = store.get(id);
            req.onsuccess = () => {
                const data = req.result;
                const newData = { ...data, ...updates };
                store.put(newData);
                resolve({ data: newData, error: null });
            };
        });
    }
};