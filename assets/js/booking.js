// assets/js/booking.js
import { db } from './supabaseClient.js';

// Carregar Dashboard
export async function loadDashboard() {
    const { data: bookings } = await db.select('bookings');
    const tbody = document.getElementById('dashboardTableBody');
    tbody.innerHTML = '';

    // Stats
    let revenue = 0;
    let pending = 0;

    bookings.forEach(b => {
        if(b.status === 'paid') revenue += parseFloat(b.amount);
        if(b.status === 'pending') pending++;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${b.guest}</strong><br><small>${b.checkin}</small></td>
            <td>${b.room}</td>
            <td>R$ ${b.amount}</td>
            <td><span class="badge ${b.status}">${b.status === 'paid' ? 'PAGO' : 'PENDENTE'}</span></td>
            <td>
                ${b.status === 'pending' 
                ? `<button onclick="window.confirmPayment(${b.id})" class="btn-primary" style="font-size:0.7rem; padding:5px 10px;">Confirmar</button>` 
                : '<span class="material-icons" style="color:green">check_circle</span>'}
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Atualiza cards
    document.getElementById('statsRevenue').innerText = `R$ ${revenue.toFixed(2)}`;
    document.getElementById('statsCheckins').innerText = pending;
}

// Criar Reserva
export async function createBooking(event) {
    event.preventDefault();
    const guest = document.getElementById('guestName').value;
    const room = document.getElementById('roomSelect').value;
    const amount = document.getElementById('totalAmount').value;

    await db.insert('bookings', {
        guest, room, amount, 
        checkin: new Date().toLocaleDateString(),
        status: 'pending'
    });
    
    alert('Reserva criada!');
    document.getElementById('bookingModal').classList.add('hidden');
    loadDashboard();
}

// Tornar funções globais para o HTML acessar
window.confirmPayment = async (id) => {
    await db.update('bookings', id, { status: 'paid' });
    loadDashboard();
};