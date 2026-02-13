import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const BLOG_POSTS: Record<string, { title: string; date: string; content: string; excerpt: string }> = {
  "blind-box-birthday-party-ideas": {
    title: "5 Creative Ways to Use Blind Boxes at Birthday Parties",
    date: "February 2026",
    excerpt: "Transform your next birthday party with DIY paper blind boxes that kids will love!",
    content: `
Birthday parties are all about surprise and delight, and what better way to deliver both than with custom paper blind boxes? Here are 5 creative ways to incorporate them into your next celebration.

## 1. Blind Box Party Favors
Instead of traditional goodie bags, send each guest home with a sealed blind box they made themselves during the party. Use our Birthday Party Kit to give each child their own set of characters to discover.

## 2. The Trading Game
Print multiple sets of characters with different rarity levels. After everyone assembles their boxes, let the trading begin! Kids naturally love collecting and trading, and you can designate "rare" characters with glitter cardstock.

## 3. Blind Box Scavenger Hunt
Hide assembled blind boxes around the party area. Kids search for them, and each box contains a character from a themed set. The first to collect all characters in a set wins a prize!

## 4. Design Your Own Character Station
Set up a craft station where kids can design their own blind box characters. Provide templates, markers, stickers, and stamps. Each child creates a unique character that gets added to the party collection.

## 5. The Grand Unboxing Ceremony
Save the best for the party highlight. Give each child a special "ultra rare" blind box to open together on the count of three. Film the reactions for an amazing group unboxing moment!

## Get Started
Ready to plan your blind box party? Check out our [Birthday Party Kit](/party-kits) with everything you need for up to 12 kids.
    `,
  },
  "paper-crafts-screen-free-activity": {
    title: "Why Paper Crafts Are the Perfect Screen-Free Activity",
    date: "February 2026",
    excerpt: "In a world of screens, paper crafts offer kids hands-on creativity that builds real skills.",
    content: `
In an era where kids spend an average of 7+ hours a day looking at screens, parents are searching for engaging alternatives. Paper crafting, especially blind box creation, offers a perfect solution.

## The Benefits of Paper Crafts for Kids

### Fine Motor Skills
Cutting, folding, and gluing paper builds the fine motor skills that kids need for writing, drawing, and other essential tasks. Blind box assembly requires precision that naturally develops hand-eye coordination.

### Creative Expression
Unlike passive screen time, paper crafts require active creative decisions. Which colors to use? How to decorate the box? What makes a character "rare"? These choices build creative confidence.

### Math & Spatial Reasoning
Folding a flat template into a 3D box is geometry in action. Kids learn about shapes, symmetry, and spatial relationships without even realizing they're doing math.

### Patience & Focus
Completing a blind box from start to finish teaches kids to follow steps, be patient with detailed work, and see a project through to completion.

### Social Skills
Blind box collecting naturally creates social opportunities - trading characters, showing off collections, and collaborating on designs.

## Making It Even Better with AI

Our AI-generated templates take paper crafting to the next level by providing endless variety. No two characters are exactly alike, which means there's always something new to create and discover.

## Getting Started
All you need is a printer, some cardstock, scissors, and glue. Check out our [supplies page](/supplies) for recommended materials, and browse our [template packs](/templates) to find the perfect theme.
    `,
  },
  "ai-revolutionizing-kids-creative-play": {
    title: "How AI is Revolutionizing Kids' Creative Play",
    date: "February 2026",
    excerpt: "AI isn't replacing creativity - it's supercharging it. Here's how.",
    content: `
When people hear "AI for kids," they often worry about replacing human creativity. But at Blind Box Generator, we're using AI to amplify creativity, not replace it.

## AI as a Creative Partner

Think of our AI generator as an infinitely creative art partner. It can produce character designs that would take a human artist hours in just seconds. But the magic isn't in the generation - it's in what kids do with those characters.

### The Human Touch
- Kids choose themes and describe characters
- They select which designs to print
- They physically build each blind box by hand
- They create stories and personalities for characters
- They decide rarity levels and trading rules

The AI handles the art; kids handle everything else.

## Why AI-Generated Characters Work

### Infinite Variety
Traditional blind box sets have a fixed number of characters. With AI generation, every box can be truly unique. This means the collecting never gets old.

### Personalization
Want a purple dinosaur astronaut? A rainbow unicorn chef? AI can create exactly what a child imagines, making each collection deeply personal.

### Accessibility
Professional character design costs hundreds per character. AI makes high-quality designs accessible to every family, regardless of budget.

## Our Approach to AI for Kids
We believe in responsible AI use:
- All generated content is kid-appropriate
- Parents control the generation process
- Physical crafting remains central to the experience
- No data is collected from children

## The Future
We're building toward a world where every child can be a blind box creator. Our AI generator launches soon - [join the waitlist](/pricing) to be the first to try it.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(BLOG_POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-brand-blue hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/blog" className="inline-flex items-center gap-2 text-brand-blue hover:underline text-sm font-semibold mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Blog
      </Link>

      <article>
        <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6">{post.title}</h1>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace("## ", "")}</h2>;
            }
            if (paragraph.startsWith("### ")) {
              return <h3 key={i} className="text-xl font-bold mt-6 mb-3">{paragraph.replace("### ", "")}</h3>;
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 my-4">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j} className="text-gray-600">{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.trim()) {
              return <p key={i} className="text-gray-600 leading-relaxed my-4">{paragraph.trim()}</p>;
            }
            return null;
          })}
        </div>
      </article>

      <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-50 to-pink-50 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Create?</h3>
        <p className="text-muted-foreground mb-4">Browse our template packs and start making blind boxes today.</p>
        <Link href="/shop" className="inline-block gradient-blue text-white px-6 py-3 rounded-full font-bold hover:opacity-90 transition-opacity">
          Shop Templates
        </Link>
      </div>
    </div>
  );
}
