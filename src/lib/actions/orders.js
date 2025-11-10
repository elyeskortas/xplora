// Orders are disabled in Xplora Tunisia travel site.
// Keep minimal stubs to satisfy imports without touching legacy models.

export async function createOrder() {
  return { success: false, message: 'Orders disabled' }
}

export async function getUserOrders() {
  return { success: false, orders: [] }
}

export async function getOrderById() {
  return { success: false, message: 'Orders disabled' }
}