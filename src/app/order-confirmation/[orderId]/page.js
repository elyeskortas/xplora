import { getOrderById } from "@/lib/actions/orders";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { formatCurrency } from '@/lib/currency'
import BackToListClient from '@/components/BackToListClient'

export default async function OrderConfirmationPage({ params }) {
  // ✅ params est désormais un Promise dans certains contextes — il faut l'await
  const { orderId } = await params;

  // ✅ cookies() est aussi async
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!orderId) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Order not found</h2>
        <p>Missing order identifier.</p>
        <Link href="/orders" className="btn btn-primary">View my orders</Link>
      </div>
    );
  }

  const result = await getOrderById(orderId, decoded.userId);

  if (!result?.success || !result?.order) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Order not found</h2>
        <p>This order does not exist or does not belong to you.</p>
        <Link href="/orders" className="btn btn-primary">View my orders</Link>
      </div>
    );
  }

  const { order } = result;

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="mb-4">
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
        </div>
        <h1 className="text-success mb-3">Order confirmed!</h1>
        <p className="lead">
          Thank you for your order at <strong>Tunisia Xplora</strong>.
        </p>
        <p>Your order <strong>#{order.orderNumber}</strong> has been recorded successfully.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order details</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6>Order information</h6>
                  <p className="mb-1">
                    <strong>Number:</strong> #{order.orderNumber}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString("en-US")}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="badge bg-warning">
                      {order.status === "pending" ? "Pending" : order.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Payment method:</strong> Cash on delivery
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Shipping address</h6>
                  <p className="mb-1">{order.shippingAddress.street}</p>
                  <p className="mb-1">
                    {order.shippingAddress.postalCode} {order.shippingAddress.city}
                  </p>
                  <p className="mb-1">{order.shippingAddress.country}</p>
                  <p className="mb-1">
                    <strong>Phone:</strong> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <h6>Ordered items</h6>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Unit price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Image
                              src={`/images/${item.image}`}
                              alt={item.title}
                              width={50}
                              height={50}
                              style={{ objectFit: "cover" }}
                              className="me-3"
                            />
                            <span>{item.title}</span>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3">Total</th>
                      <th>{formatCurrency(order.totalAmount)}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {order.notes && (
                <div className="mt-4">
                  <h6>Notes</h6>
                  <p className="text-muted">{order.notes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <Link href="/orders" className="btn btn-primary me-3">
              View my orders
            </Link>
            <BackToListClient />
          </div>
        </div>
      </div>
    </div>
  );
}