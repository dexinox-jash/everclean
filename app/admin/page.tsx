import { redirect } from "next/navigation";
import Link from "next/link";
import { Calendar, Users, MessageSquare, DollarSign, Clock } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

async function getDashboardStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [
      todaysBookings,
      weeksRevenue,
      pendingConfirmations,
      newLeads,
      totalBookings,
      totalCustomers,
    ] = await Promise.all([
      db.booking.count({
        where: {
          scheduledDate: { gte: today },
          status: { in: ["CONFIRMED", "IN_PROGRESS"] },
        },
      }),
      db.booking.aggregate({
        where: {
          createdAt: { gte: weekAgo },
          paymentStatus: "PAID",
        },
        _sum: { amountPaid: true },
      }),
      db.booking.count({
        where: { status: "PENDING" },
      }),
      db.contactForm.count({
        where: { status: "NEW" },
      }),
      db.booking.count(),
      db.user.count({ where: { role: "CUSTOMER" } }),
    ]);

    return {
      todaysBookings,
      weeksRevenue: weeksRevenue._sum.amountPaid || 0,
      pendingConfirmations,
      newLeads,
      totalBookings,
      totalCustomers,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      todaysBookings: 0,
      weeksRevenue: 0,
      pendingConfirmations: 0,
      newLeads: 0,
      totalBookings: 0,
      totalCustomers: 0,
    };
  }
}

async function getRecentBookings() {
  try {
    return await db.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Failed to fetch recent bookings:", error);
    return [];
  }
}

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "MANAGER")) {
    redirect("/");
  }

  const stats = await getDashboardStats();
  const recentBookings = await getRecentBookings();

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
    <div className="min-h-screen bg-[var(--color-ivory)]">
      {/* Admin Header */}
      <header className="bg-navy-900 text-[var(--color-ivory)] py-4">
        <div className="container-luxury flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl">Admin Dashboard</h1>
            <p className="text-sm text-[var(--color-ivory)]/60">Welcome, {session.user.name}</p>
          </div>
          <Link
            href="/"
            className="text-sm text-gold-500 hover:text-gold-400"
          >
            Return to Site
          </Link>
        </div>
      </header>

      <div className="container-luxury py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[var(--color-pure)] p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif text-navy-700">{stats.todaysBookings}</span>
            </div>
            <p className="text-sm text-stone-light">Today&apos;s Bookings</p>
          </div>

          <div className="bg-[var(--color-pure)] p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif text-navy-700">
                {formatCurrency(Number(stats.weeksRevenue))}
              </span>
            </div>
            <p className="text-sm text-stone-light">Revenue This Week</p>
          </div>

          <div className="bg-[var(--color-pure)] p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-amber-500" />
              <span className="text-2xl font-serif text-navy-700">{stats.pendingConfirmations}</span>
            </div>
            <p className="text-sm text-stone-light">Pending Confirmations</p>
          </div>

          <div className="bg-[var(--color-pure)] p-6 shadow-luxury">
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif text-navy-700">{stats.newLeads}</span>
            </div>
            <p className="text-sm text-stone-light">New Leads</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2 bg-[var(--color-pure)] shadow-luxury">
            <div className="p-6 border-b border-[var(--color-border)]">
              <h2 className="font-serif text-xl text-stone">Recent Bookings</h2>
            </div>
            {recentBookings.length === 0 ? (
              <div className="p-8 text-center text-stone-light">
                No bookings found
              </div>
            ) : (
              <div className="divide-y divide-[var(--color-border)]">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-6 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs text-stone-muted">{booking.bookingNumber}</span>
                        <span className={`px-2 py-0.5 text-xs uppercase ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <h3 className="font-medium text-stone">{booking.customerName}</h3>
                      <p className="text-sm text-stone-light">{booking.service?.name || "N/A"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-serif text-lg text-navy-700">
                        {formatCurrency(Number(booking.calculatedPrice))}
                      </p>
                      <p className="text-xs text-stone-muted">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-[var(--color-pure)] p-6 shadow-luxury">
              <h2 className="font-serif text-xl text-stone mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 bg-cream hover:bg-gold-500/10 transition-colors text-left">
                  <Calendar className="w-5 h-5 text-gold-500" />
                  <span className="text-stone">Manage Bookings</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-cream hover:bg-gold-500/10 transition-colors text-left">
                  <Users className="w-5 h-5 text-gold-500" />
                  <span className="text-stone">Staff Schedule</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-cream hover:bg-gold-500/10 transition-colors text-left">
                  <MessageSquare className="w-5 h-5 text-gold-500" />
                  <span className="text-stone">View Leads</span>
                </button>
              </div>
            </div>

            {/* Overview Stats */}
            <div className="bg-navy-900 text-[var(--color-ivory)] p-6">
              <h2 className="font-serif text-xl mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory)]/70">Total Bookings</span>
                  <span className="font-serif text-xl">{stats.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory)]/70">Total Customers</span>
                  <span className="font-serif text-xl">{stats.totalCustomers}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
