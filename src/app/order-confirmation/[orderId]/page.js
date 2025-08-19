import { getOrderById } from "@/lib/actions/orders";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function OrderConfirmationPage({ params }) {
  // ✅ params est désormais un Promise dans certains contextes — il faut l'await
  const { orderId } = await params;

  // ✅ cookies() est aussi async
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) redirect("/auth/login");

  const decoded = verifyToken(token.value);
  if (!decoded) redirect("/auth/login");

  if (!orderId) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Commande non trouvée</h2>
        <p>Identifiant de commande manquant.</p>
        <Link href="/orders" className="btn btn-primary">Voir mes commandes</Link>
      </div>
    );
  }

  const result = await getOrderById(orderId, decoded.userId);

  if (!result?.success || !result?.order) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger">Commande non trouvée</h2>
        <p>Cette commande n&apos;existe pas ou ne vous appartient pas.</p>
        <Link href="/orders" className="btn btn-primary">Voir mes commandes</Link>
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
        <h1 className="text-success mb-3">Commande confirmée !</h1>
        <p className="lead">
          Merci pour votre commande chez <strong>Vinylia</strong>.
        </p>
        <p>Votre commande <strong>#{order.orderNumber}</strong> a été enregistrée avec succès.</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Détails de la commande</h5>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h6>Informations de commande</h6>
                  <p className="mb-1">
                    <strong>Numéro:</strong> #{order.orderNumber}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="mb-1">
                    <strong>Statut:</strong>{" "}
                    <span className="badge bg-warning">
                      {order.status === "pending" ? "En attente" : order.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    <strong>Mode de paiement:</strong> Paiement à la livraison
                  </p>
                </div>
                <div className="col-md-6">
                  <h6>Adresse de livraison</h6>
                  <p className="mb-1">{order.shippingAddress.street}</p>
                  <p className="mb-1">
                    {order.shippingAddress.postalCode} {order.shippingAddress.city}
                  </p>
                  <p className="mb-1">{order.shippingAddress.country}</p>
                  <p className="mb-1">
                    <strong>Tél:</strong> {order.shippingAddress.phone}
                  </p>
                </div>
              </div>

              <h6>Articles commandés</h6>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Article</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
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
                        <td>${item.price.toFixed(2)}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="3">Total</th>
                      <th>${order.totalAmount.toFixed(2)}</th>
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
              Voir mes commandes
            </Link>
            <Link href="/vinyles" className="btn btn-outline-secondary">
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}