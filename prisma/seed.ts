import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Services
  const services = [
    {
      slug: 'estate-cleaning',
      name: 'Estate White-Glove Cleaning',
      shortDescription: 'Comprehensive care for distinguished residences with meticulous attention to fine furnishings and art.',
      fullDescription: `Our signature estate cleaning service is designed for homes that demand the highest standards of care. Our trained professionals use museum-quality techniques and products specifically selected for fine wood, marble, and delicate surfaces.

Each visit includes:
• Detailed dusting of all surfaces including crown molding and built-ins
• Careful cleaning of fine art and antiques with appropriate methods
• Hardwood and natural stone floor care with pH-neutral solutions
• Upholstery vacuuming with HEPA filtration
• Window and mirror cleaning (interior)
• Bed linen refresh and meticulous bathroom sanitation
• Air quality enhancement through thorough particulate removal`,
      basePrice: 450.00,
      priceMultiplier: { studio: 1, '1bed': 1.2, '2bed': 1.5, '3bed': 2, '4bed': 2.5, estate: 3.5 },
      durationHours: 4,
      features: [
        'Museum-quality cleaning techniques',
        'pH-neutral products for delicate surfaces',
        'HEPA filtration vacuuming',
        'Fine art and antique care',
        'Natural stone and hardwood specialists',
        'Discretion guaranteed',
        'Unmarked vehicle available'
      ],
      bestFor: 'Homes 3000+ sq ft with fine furnishings, art collections, or luxury finishes',
      requiresConsult: false,
      isActive: true,
      isPopular: true,
      sortOrder: 1,
      icon: 'Crown'
    },
    {
      slug: 'concierge-maintenance',
      name: 'Concierge Maintenance Program',
      shortDescription: 'Weekly or bi-weekly scheduled care that preserves your home\'s pristine condition year-round.',
      fullDescription: `For discerning homeowners who expect their residence to be immaculate at all times. Our Concierge Maintenance Program provides consistent, scheduled care with the same dedicated team who learn your preferences and your home's unique requirements.

Program includes:
• Same dedicated cleaning specialists each visit
• Customized cleaning protocol based on your home's needs
• Priority scheduling including same-day touch-ups
• Seasonal deep cleaning sessions (quarterly)
• 24/7 concierge support line
• Complimentary arrival refreshments for staff
• Detailed service notes maintained between visits`,
      basePrice: 350.00,
      priceMultiplier: { studio: 1, '1bed': 1.1, '2bed': 1.3, '3bed': 1.7, '4bed': 2.2, estate: 3 },
      durationHours: 3,
      features: [
        'Dedicated team assignment',
        'Weekly or bi-weekly scheduling',
        'Priority booking availability',
        'Quarterly deep cleaning included',
        '24/7 concierge support',
        'Service history tracking',
        'Automatic rescheduling for holidays'
      ],
      bestFor: 'Busy professionals and families who value consistency and priority service',
      requiresConsult: true,
      isActive: true,
      isPopular: false,
      sortOrder: 2,
      icon: 'CalendarClock'
    },
    {
      slug: 'pre-event-prep',
      name: 'Pre-Event Preparation',
      shortDescription: 'Immaculate presentation for dinner parties, open houses, or special occasions.',
      fullDescription: `Ensure your home makes the perfect impression. Our pre-event service focuses on presentation-level perfection—every surface gleaming, every detail attended to, creating an environment that enhances any gathering.

Service details:
• Complete surface polishing and streak-free finishing
• Guest bathroom preparation with luxury amenities
• Entryway and common area presentation focus
• Outdoor space tidying (patios, terraces)
• Kitchen deep-clean for caterer preparation
• Final walkthrough with manager before your event
• Post-event quick refresh available`,
      basePrice: 550.00,
      priceMultiplier: { studio: 1, '1bed': 1.1, '2bed': 1.3, '3bed': 1.6, '4bed': 2, estate: 2.8 },
      durationHours: 5,
      features: [
        'Presentation-level detail work',
        'Guest bathroom luxury preparation',
        'Kitchen caterer-ready deep clean',
        'Outdoor space presentation',
        'Manager final walkthrough',
        'Same-day post-event refresh available',
        'Flexible timing for event schedules'
      ],
      bestFor: 'Hosts preparing for dinner parties, charity events, open houses, or celebrations',
      requiresConsult: false,
      isActive: true,
      isPopular: false,
      sortOrder: 3,
      icon: 'PartyPopper'
    },
    {
      slug: 'post-renovation',
      name: 'Post-Renovation Restoration',
      shortDescription: 'Transform construction dust into pristine luxury—meticulous cleaning after renovations.',
      fullDescription: `Construction creates dust that settles everywhere. Our post-renovation service eliminates every trace of construction debris, restoring your home to its intended glory with specialized techniques for new finishes.

Comprehensive restoration:
• HEPA air scrubbing and vent cleaning
• Construction dust removal from all surfaces
• New fixture and appliance polishing
• Window and track deep cleaning
• Floor finish restoration and protection
• Cabinet interior and exterior detailing
• Air quality testing available`,
      basePrice: 800.00,
      priceMultiplier: { studio: 1, '1bed': 1.2, '2bed': 1.5, '3bed': 2, '4bed': 2.8, estate: 4 },
      durationHours: 8,
      features: [
        'Construction dust elimination',
        'HEPA air scrubbing',
        'New fixture polishing',
        'Vent and duct cleaning',
        'Floor finish protection',
        'Window track restoration',
        'Multiple-day service available'
      ],
      bestFor: 'Homeowners completing renovations who need construction dust fully eliminated',
      requiresConsult: true,
      isActive: true,
      isPopular: false,
      sortOrder: 4,
      icon: 'Hammer'
    },
    {
      slug: 'seasonal-deep',
      name: 'Seasonal Deep Cleaning',
      shortDescription: 'Quarterly intensive care that reaches every corner—spring, summer, fall, and winter readiness.',
      fullDescription: `Go beyond surface cleaning with our comprehensive seasonal service. We reach the areas that daily life overlooks, preparing your home for the season ahead with thorough attention to detail.

Seasonal attention includes:
• Behind and beneath furniture cleaning
• Window cleaning (interior and tracks)
• Light fixture and ceiling fan detailing
• Baseboard and molding deep cleaning
• Closet organization and vacuuming
• Seasonal item storage preparation
• HVAC vent cleaning for air quality`,
      basePrice: 650.00,
      priceMultiplier: { studio: 1, '1bed': 1.2, '2bed': 1.5, '3bed': 2, '4bed': 2.5, estate: 3.5 },
      durationHours: 6,
      features: [
        'Behind and beneath furniture',
        'Window and track deep cleaning',
        'Light fixture detailing',
        'Baseboard and molding care',
        'Closet organization included',
        'HVAC vent cleaning',
        'Seasonal preparation focus'
      ],
      bestFor: 'Quarterly maintenance for homes that need periodic intensive attention',
      requiresConsult: false,
      isActive: true,
      isPopular: false,
      sortOrder: 5,
      icon: 'Leaf'
    }
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service
    });
    console.log(`✅ Service: ${service.name}`);
  }

  // Create admin user if environment variables are set
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        email: adminEmail,
        name: 'System Administrator',
        role: 'ADMIN',
        emailVerified: new Date()
      }
    });
    console.log(`✅ Admin user: ${adminEmail}`);
  }

  // Site configuration
  const configs = [
    { key: 'company_phone', value: '+1 (519) 555-0123', description: 'Main contact phone number' },
    { key: 'company_email', value: 'concierge@everclean.ca', description: 'Main contact email' },
    { key: 'service_area', value: 'Waterloo Region', description: 'Primary service area' },
    { key: 'insurance_amount', value: '$5,000,000', description: 'Liability insurance coverage' },
    { key: 'cancellation_policy', value: '48 hours for full refund, 24 hours for 50% refund', description: 'Cancellation policy summary' }
  ];

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: config,
      create: config
    });
  }
  console.log('✅ Site configuration');

  // Create sample staff members
  const staffMembers = [
    {
      name: 'Sarah M.',
      email: 'sarah@everclean.internal',
      phone: '+1 (519) 555-0101',
      bio: 'Specialist in fine art and antique care with 8 years of experience in luxury hospitality.',
      role: 'supervisor',
      isActive: true
    },
    {
      name: 'Michael T.',
      email: 'michael@everclean.internal',
      phone: '+1 (519) 555-0102',
      bio: 'Expert in natural stone and hardwood maintenance. Background in hotel housekeeping management.',
      role: 'cleaner',
      isActive: true
    },
    {
      name: 'Jennifer K.',
      email: 'jennifer@everclean.internal',
      phone: '+1 (519) 555-0103',
      bio: 'Detail-oriented specialist with certification in eco-friendly cleaning methods for sensitive environments.',
      role: 'cleaner',
      isActive: true
    }
  ];

  for (const staff of staffMembers) {
    await prisma.staff.upsert({
      where: { email: staff.email },
      update: staff,
      create: staff
    });
  }
  console.log('✅ Sample staff members');

  console.log('\n✨ Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
