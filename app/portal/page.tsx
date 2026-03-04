import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, ChevronRight, Home, User, CreditCard } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate, formatTime, formatCurrency } from "@/lib/utils";

async function getUserBookings(userEmail: string) {
  return await db.booking.findMany({
    where: { customerEmail: userEmail },
    include: { service: true },
    orderBy: { scheduledDate: "desc" },
    take: 5,
  });
}

export default async function PortalDashboardPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    redirect("/portal/login");
  }

  const bookings = await getUserBookings(session.user.email);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      PENDING: "bg-amber-100 text-amber-800",
      CONFIRMED: "bg-emerald-100 text-emerald-800",
      IN_PROGRESS: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-slate-100 text-slate-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[var(--color-ivory)]">
      <div className="container-luxury">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-stone mb-2">
            Welcome, {session.user.name?.split(" ")[0] || "Client"}
          </h1>
          <p className="text-stone-light">Manage your bookings and account settings</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/booking"
            className="group p-6 bg-[var(--color-pure)] border border-[var(--color-border)] hover:border-gold-500/50 transition-colors"
          >
            <Calendar className="w-8 h-8 text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-stone mb-1 group-hover:text-gold-600 transition-colors">
              Book a Service
            </h3>
            <p className="text-sm text-stone-light">Schedule a new cleaning</p>
          </Link>

          <Link
            href="/portal/profile"
            className="group p-6 bg-[var(--color-pure)] border border-[var(--color-border)] hover:border-gold-500/50 transition-colors"
          >
            <User className="w-8 h-8 text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-stone mb-1 group-hover:text-gold-600 transition-colors">
              Profile Settings
            </h3>
            <p className="text-sm text-stone-light">Update your preferences</p>
          </Link>

          <Link
            href="/portal/addresses"
            className="group p-6 bg-[var(--color-pure)] border border-[var(--color-border)] hover:border-gold-500/50 transition-colors"
          >
            <Home className="w-8 h-8 text-gold-500 mb-4" />
            <h3 className="font-serif text-lg text-stone mb-1 group-hover:text-gold-600 transition-colors">
              My Addresses
            </h3>
            <p className="text-sm text-stone-light">Manage your properties</p>
          </Link>
        </div>

        {/* Recent Bookings */}
        <div className="bg-[var(--color-pure)] shadow-luxury">
          <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
            <h2 className="font-serif text-xl text-stone">Recent Bookings</h2>
            <Link
              href="/portal/bookings"
              className="text-sm text-gold-600 hover:text-gold-700 flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-stone-muted mx-auto mb-4" />
              <p className="text-stone mb-4">No bookings yet</p>
              <Link href="/booking" className="btn-secondary">
                Book Your First Service
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-border)]">
              {bookings.map((booking) => (
                <Link
                  key={booking.id}
                  href={`/portal/bookings/${booking.id}`}
                  className="block p-6 hover:bg-cream transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs uppercase tracking-wider text-stone-muted">
                          {booking.bookingNumber}
                        </span>
                        <span className={`px-2 py-1 text-xs uppercase tracking-wider ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg text-stone">{booking.serviceName}</h3>
                      <p className="text-sm text-stone-light">
                        {formatDate(booking.scheduledDate)} at {formatTime(booking.scheduledTime)}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="font-serif text-lg text-navy-700">
                          {formatCurrency(Number(booking.calculatedPrice))}
                        </p>
                        <p className="text-xs text-stone-muted uppercase tracking-wider">
                          {booking.paymentStatus}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-stone-muted" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
