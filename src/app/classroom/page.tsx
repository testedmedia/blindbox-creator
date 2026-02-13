import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  CheckCircle,
  ArrowRight,
  BookOpen,
  Lightbulb,
  Palette,
  Calculator,
  Brain,
  Wrench,
  ShoppingCart,
  Star,
  MessageCircle,
} from "lucide-react";
import { CLASSROOM_BUNDLES, formatPrice } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Classroom Bundles",
  description:
    "STEAM-powered blind box activities for classrooms. Bundles for 10 or 30 students with lesson plans, activity sheets, and assessment rubrics.",
};

const EMOJI_MAP: Record<string, string> = {
  "classroom-30": "🏫",
  "classroom-starter": "📚",
};

const STEAM_BENEFITS = [
  {
    icon: Brain,
    title: "Science",
    description: "Kids learn about materials, paper engineering, and structural integrity as they fold and construct.",
    color: "bg-brand-blue",
  },
  {
    icon: Wrench,
    title: "Technology",
    description: "Explore how AI generates characters. Discuss digital design and printing technology.",
    color: "bg-brand-green",
  },
  {
    icon: Calculator,
    title: "Engineering",
    description: "Folding, cutting, and assembling 3D structures from flat paper. Real engineering principles!",
    color: "bg-brand-orange",
  },
  {
    icon: Palette,
    title: "Art",
    description: "Character design, color theory, and creative expression. Kids can customize their creations.",
    color: "bg-brand-pink",
  },
  {
    icon: Lightbulb,
    title: "Math",
    description: "Symmetry, geometry, measurement, and trading math. Count, sort, and categorize characters.",
    color: "bg-brand-purple",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "My 3rd graders were SO engaged. They begged me to do it again the next week. The lesson plan integration was seamless.",
    name: "Ms. Rodriguez",
    role: "3rd Grade Teacher, CA",
    rating: 5,
  },
  {
    quote:
      "I used this for our STEAM night and parents were amazed. The kids loved trading characters and the assessment rubric saved me hours.",
    name: "Mr. Patel",
    role: "Elementary STEAM Coordinator, TX",
    rating: 5,
  },
  {
    quote:
      "Perfect for my special needs classroom. The step-by-step guide made it accessible for every student. Highly recommend the 30-student bundle.",
    name: "Mrs. Thompson",
    role: "Special Education Teacher, NY",
    rating: 5,
  },
];

export default function ClassroomPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0">
          <Image src="/products/product-lifestyle-desk.png" alt="Craft supplies on desk" width={1200} height={800} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-purple/85 to-brand-pink/80" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-5xl block mb-4">🏫</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Classroom Bundles
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
            STEAM meets paper crafting. Turn your classroom into a creative studio with blind box activities
            that teach science, engineering, art, and math all at once.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Curriculum-aligned
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Grades K-6
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Lesson plans included
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Assessment rubric
            </span>
          </div>
        </div>
      </section>

      {/* Bundles Grid */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-10">
            Choose Your Bundle
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {CLASSROOM_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-white border-2 border-border rounded-2xl overflow-hidden hover:border-brand-purple/40 hover:shadow-brand transition-all flex flex-col"
              >
                {/* Image area */}
                <div className="bg-brand-purple/5 h-48 flex items-center justify-center relative overflow-hidden">
                  <Image src={bundle.id === "classroom-30" ? "/products/child-crafting-closeup.png" : "/products/hero-kawaii-collection.png"} alt={bundle.name} width={500} height={300} className="w-full h-full object-cover" />
                  {bundle.badge && (
                    <span className="absolute top-3 right-3 bg-brand-purple text-white text-xs font-bold px-3 py-1 rounded-full">
                      {bundle.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold mb-3">{bundle.name}</h3>
                  <p className="text-muted-foreground mb-6">{bundle.description}</p>

                  {/* Features */}
                  {bundle.features && (
                    <ul className="space-y-3 mb-8 flex-1">
                      {bundle.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Price + CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <div>
                      <span className="text-3xl font-extrabold text-brand-purple">
                        {formatPrice(bundle.price)}
                      </span>
                      {bundle.id === "classroom-30" && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({formatPrice(Math.round(bundle.price / 30))}/student)
                        </span>
                      )}
                      {bundle.id === "classroom-starter" && (
                        <span className="text-sm text-muted-foreground ml-2">
                          ({formatPrice(Math.round(bundle.price / 10))}/student)
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/api/checkout?product=${bundle.id}`}
                      className="gradient-blue text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity shadow-brand flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Buy Bundle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Blind Boxes in the Classroom */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="w-10 h-10 text-brand-purple mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Why Blind Boxes in the Classroom?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              One activity. Five STEAM disciplines. Maximum engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEAM_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm"
              >
                <div
                  className={`${benefit.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Teachers Say */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <MessageCircle className="w-10 h-10 text-brand-blue mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              What Teachers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-muted rounded-2xl p-6 md:p-8"
              >
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-brand-yellow fill-brand-yellow"
                    />
                  ))}
                </div>

                <p className="text-sm text-foreground mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div>
                  <p className="font-bold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Bundle CTA */}
      <section className="bg-gradient-to-br from-brand-purple/5 via-brand-blue/5 to-brand-pink/5 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-4xl block mb-4">💡</span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Need a Custom Bundle?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Have more than 30 students? Need specific themes? Want district-level licensing?
            Let's build a custom package that fits your needs perfectly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 gradient-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-brand w-full sm:w-auto justify-center"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-blue/5 transition-colors w-full sm:w-auto justify-center"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="gradient-fun py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            Also Perfect for After-School Programs
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Libraries, summer camps, scout troops, and homeschool co-ops all love our classroom bundles.
            One kit, hours of creative fun.
          </p>
          <Link
            href="/supplies"
            className="inline-flex items-center gap-2 bg-white text-brand-purple px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 transition-colors"
          >
            View Recommended Supplies <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
