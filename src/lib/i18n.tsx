"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Lang = "en" | "es";

const translations: Record<string, Record<Lang, string>> = {
  // Navbar
  "nav.create": { en: "Create", es: "Crear" },
  "nav.shop": { en: "Shop", es: "Tienda" },
  "nav.templates": { en: "Templates", es: "Plantillas" },
  "nav.pricing": { en: "Pricing", es: "Precios" },
  "nav.earn": { en: "Earn 50%", es: "Gana 50%" },
  "nav.supplies": { en: "Supplies", es: "Materiales" },
  "nav.tryFree": { en: "Try AI Free", es: "Prueba IA Gratis" },
  "nav.tryGenerator": { en: "Try AI Generator Free", es: "Prueba el Generador IA Gratis" },

  // Home hero
  "home.badge": { en: "AI-Powered Paper Crafts", es: "Manualidades con IA" },
  "home.title1": { en: "Build Memories", es: "Crea Recuerdos" },
  "home.title2": { en: "With Your Kids", es: "Con Tus Hijos" },
  "home.subtitle": {
    en: "AI-generated kawaii characters you can print, fold into blind boxes, and collect. No craft skills needed.",
    es: "Personajes kawaii generados por IA que puedes imprimir, doblar en cajas sorpresa y coleccionar. Sin necesidad de habilidades manuales."
  },
  "home.tryAI": { en: "Try AI Generator Free", es: "Prueba el Generador IA Gratis" },
  "home.browse": { en: "Browse Templates", es: "Ver Plantillas" },
  "home.noCraft": { en: "No craft skills needed", es: "Sin habilidades manuales" },
  "home.download2min": { en: "Download & print in 2 min", es: "Descarga e imprime en 2 min" },
  "home.kidsLove": { en: "Kids absolutely love it", es: "A los ninos les encanta" },

  // Home page
  "home.shopTemplates": { en: "Shop Templates", es: "Ver Plantillas" },
  "home.perfectAges": { en: "Perfect for ages 4-12", es: "Perfecto para edades 4-12" },
  "home.familyCraft": { en: "Family Craft Time", es: "Manualidades en Familia" },
  "home.familyCraftHighlight": { en: "Made Easy", es: "Facil" },
  "home.familyCraftSubtitle": { en: "Parents and kids love making these together. No mess, no stress, just quality time.", es: "A padres e hijos les encanta hacerlas juntos. Sin desorden, sin estres, solo tiempo de calidad." },
  "home.soEasy": { en: "So Easy, Anyone Can Do It", es: "Tan Facil, Cualquiera Puede Hacerlo" },
  "home.soEasySubtitle": { en: "If your kid can use scissors, they can make a blind box. Seriously. Three steps, ten minutes, endless fun.", es: "Si tu hijo puede usar tijeras, puede hacer una caja sorpresa. En serio. Tres pasos, diez minutos, diversion sin fin." },
  "home.step1Title": { en: "1. Pick Your Pack", es: "1. Elige Tu Paquete" },
  "home.step1Desc": { en: "Choose from dozens of adorable themes. Animals, unicorns, magical girls, and more. Each pack has 12 characters inside.", es: "Elige entre docenas de temas adorables. Animales, unicornios, chicas magicas y mas. Cada paquete tiene 12 personajes." },
  "home.step2Title": { en: "2. Print, Cut & Fold", es: "2. Imprime, Corta y Dobla" },
  "home.step2Desc": { en: "Hit print on any home printer. Cut along the lines, fold on the dots, and glue the tabs. That's it. Done!", es: "Imprime en cualquier impresora. Corta las lineas, dobla los puntos y pega las pestanas. Eso es todo. Listo!" },
  "home.step3Title": { en: "3. Surprise & Trade!", es: "3. Sorpresa e Intercambio!" },
  "home.step3Desc": { en: "Put the characters in the box, close it up, and open it like a real blind box. Trade with siblings and friends!", es: "Pon los personajes en la caja, cierrala y abrela como una caja sorpresa real. Intercambia con hermanos y amigos!" },
  "home.featuredTemplates": { en: "Featured Templates", es: "Plantillas Destacadas" },
  "home.featuredSubtitle": { en: "Each pack includes 12 unique characters, box designs, and assembly guide", es: "Cada paquete incluye 12 personajes unicos, disenos de cajas y guia de armado" },
  "home.viewAll": { en: "View All Templates", es: "Ver Todas las Plantillas" },
  "home.viewPack": { en: "View Pack", es: "Ver Paquete" },
  "home.beyondTemplates": { en: "Beyond Templates", es: "Mas Alla de las Plantillas" },
  "home.partyKits": { en: "Birthday Party Kits", es: "Kits de Fiesta de Cumpleanos" },
  "home.partyDesc": { en: "The easiest birthday party activity ever. Print the templates, hand them out, and watch 12 kids go wild making their own blind boxes. Zero prep stress.", es: "La actividad de fiesta mas facil. Imprime las plantillas, reparte y mira a 12 ninos hacer sus propias cajas sorpresa. Cero estres de preparacion." },
  "home.partyFeature1": { en: "Multiple theme packs included", es: "Multiples paquetes tematicos incluidos" },
  "home.partyFeature2": { en: "Printable invitations & thank yous", es: "Invitaciones y agradecimientos imprimibles" },
  "home.partyFeature3": { en: "Step-by-step party guide", es: "Guia de fiesta paso a paso" },
  "home.exploreParty": { en: "Explore Party Kits", es: "Explorar Kits de Fiesta" },
  "home.classroomBundles": { en: "Classroom Bundles", es: "Paquetes para el Aula" },
  "home.classroomDesc": { en: "Teachers love this. Print enough for the whole class. Kids learn cutting, folding, and following instructions while having the time of their lives.", es: "A los maestros les encanta. Imprime para toda la clase. Los ninos aprenden a cortar, doblar y seguir instrucciones mientras se divierten." },
  "home.classroomFeature1": { en: "Sets for 10 or 30 students", es: "Sets para 10 o 30 estudiantes" },
  "home.classroomFeature2": { en: "Lesson plan integration guide", es: "Guia de integracion al plan de clases" },
  "home.classroomFeature3": { en: "STEAM activity sheets included", es: "Hojas de actividades STEAM incluidas" },
  "home.exploreClassroom": { en: "Explore Classroom Bundles", es: "Explorar Paquetes para el Aula" },
  "home.foundingMember": { en: "Join as a Founding Member", es: "Unete como Miembro Fundador" },
  "home.foundingDesc": { en: "Lock in", es: "Asegura" },
  "home.foundingDescHighlight": { en: "50% off forever", es: "50% de descuento para siempre" },
  "home.foundingDescEnd": { en: "Create unlimited custom characters with AI. Pick any theme, any style. This price disappears when we leave beta.", es: "Crea personajes ilimitados con IA. Elige cualquier tema, cualquier estilo. Este precio desaparece cuando salgamos de beta." },
  "home.perYear": { en: "/year", es: "/ano" },
  "home.emailTitle": { en: "Try It Free - 3 Characters on Us", es: "Pruebalo Gratis - 3 Personajes de Regalo" },
  "home.emailSubtitle": { en: "Not sure yet? We'll send you 3 free printable characters right now. Print them with your kids tonight. You'll be hooked.", es: "No estas seguro? Te enviaremos 3 personajes imprimibles gratis ahora. Imprimalos con tus hijos esta noche. Te encantaran." },
  "home.emailPlaceholder": { en: "your@email.com", es: "tu@email.com" },
  "home.emailSending": { en: "Sending...", es: "Enviando..." },
  "home.emailButton": { en: "Send My Free Templates", es: "Enviar Mis Plantillas Gratis" },
  "home.emailSuccess": { en: "Check your inbox! Free templates are on the way.", es: "Revisa tu bandeja! Las plantillas gratis van en camino." },
  "home.heroSubtitle": { en: "Print. Cut. Fold. Surprise! Adorable kawaii characters your whole family can make together. No glue gun, no mess, no experience needed. Just a printer and 10 minutes of family fun.", es: "Imprime. Corta. Dobla. Sorpresa! Adorables personajes kawaii que toda tu familia puede hacer juntos. Sin pistola de pegamento, sin desorden, sin experiencia. Solo una impresora y 10 minutos de diversion familiar." },

  // Create page
  "create.title": { en: "Create a", es: "Crea una" },
  "create.titleHighlight": { en: "Blind Box", es: "Caja Sorpresa" },
  "create.subtitle": {
    en: "Describe your dream character and AI makes it real. Free.",
    es: "Describe tu personaje ideal y la IA lo hace realidad. Gratis."
  },
  "create.button": { en: "Create My Blind Box", es: "Crear Mi Caja Sorpresa" },
  "create.uploadPhoto": { en: "Upload photo", es: "Subir foto" },
  "create.changePhoto": { en: "Change photo", es: "Cambiar foto" },
  "create.freeLeft": { en: "free left today", es: "gratis hoy" },
  "create.dailyLimit": { en: "Daily limit reached", es: "Limite diario alcanzado" },
  "create.upgrade": { en: "Upgrade for unlimited", es: "Actualiza para ilimitado" },
  "create.viewPlans": { en: "View Plans", es: "Ver Planes" },
  "create.downloadPNG": { en: "Download PNG", es: "Descargar PNG" },
  "create.createAnother": { en: "Create Another", es: "Crear Otro" },
  "create.getPrintable": { en: "Get Printable Box Template", es: "Obtener Plantilla Imprimible" },
  "create.printTip": { en: "Print on 80lb cardstock for best results!", es: "Imprime en cartulina de 80lb para mejores resultados!" },
  "create.getSupplies": { en: "Get supplies", es: "Ver materiales" },
  "create.sampleNoticeTitle": { en: "AI generator is scaling up", es: "El generador IA esta escalando" },
  "create.sampleNoticeDesc": {
    en: "Here's a sample character from our collection while we add more capacity. Try again later for custom characters from your prompt!",
    es: "Aqui tienes un personaje de muestra de nuestra coleccion mientras agregamos mas capacidad. Intenta mas tarde para personajes personalizados!"
  },
  "create.whatYouCanCreate": { en: "What You Can Create", es: "Lo Que Puedes Crear" },
  "create.kawaiiReady": { en: "Kawaii characters ready to print, cut, and collect", es: "Personajes kawaii listos para imprimir, cortar y coleccionar" },
  "create.3steps": { en: "3 Steps. That's It.", es: "3 Pasos. Eso Es Todo." },
  "create.step1": { en: "Describe It", es: "Describelo" },
  "create.step1desc": { en: "Type what you want or upload a photo", es: "Escribe lo que quieres o sube una foto" },
  "create.step2": { en: "AI Creates It", es: "La IA Lo Crea" },
  "create.step2desc": { en: "Unique kawaii character in 15 seconds", es: "Personaje kawaii unico en 15 segundos" },
  "create.step3": { en: "Print & Collect", es: "Imprime y Colecciona" },
  "create.step3desc": { en: "Download, print on cardstock, fold & display", es: "Descarga, imprime en cartulina, dobla y exhibe" },
  "create.createYour": { en: "Create Your Character", es: "Crea Tu Personaje" },
  "create.loading": { en: "Creating Your Character", es: "Creando Tu Personaje" },

  // Loading steps
  "loading.1": { en: "Imagining your character...", es: "Imaginando tu personaje..." },
  "loading.2": { en: "Sketching the design...", es: "Bocetando el diseno..." },
  "loading.3": { en: "Adding kawaii details...", es: "Agregando detalles kawaii..." },
  "loading.4": { en: "Coloring with pastels...", es: "Coloreando con pasteles..." },
  "loading.5": { en: "Almost done!", es: "Casi listo!" },

  // Create page - dynamic strings
  "create.networkError": { en: "Network error. Try again.", es: "Error de red. Intenta de nuevo." },
  "create.typePrompt": { en: "Type what you want to create!", es: "Escribe lo que quieras crear!" },
  "create.photoUploaded": { en: "Photo uploaded!", es: "Foto subida!" },
  "create.photoError": { en: "Upload a PNG or JPG under 10MB", es: "Sube un PNG o JPG menor a 10MB" },
  "create.timing": { en: "10-20 seconds", es: "10-20 segundos" },

  // Shop
  "shop.title": { en: "Template Packs", es: "Paquetes de Plantillas" },
  "shop.subtitle": { en: "Each pack includes 12 unique characters, box designs, and assembly guide.", es: "Cada paquete incluye 12 personajes unicos, disenos de cajas y guia de armado." },
  "shop.buyNow": { en: "Buy Now", es: "Comprar Ahora" },
  "shop.viewDetails": { en: "View Details", es: "Ver Detalles" },

  // Pricing
  "pricing.title": { en: "Simple Pricing", es: "Precios Simples" },
  "pricing.subtitle": { en: "Start free. Upgrade when you're ready.", es: "Empieza gratis. Actualiza cuando quieras." },
  "pricing.free": { en: "Free Explorer", es: "Explorador Gratis" },
  "pricing.startFree": { en: "Start Free", es: "Empezar Gratis" },
  "pricing.perYear": { en: "per year", es: "por ano" },
  "pricing.forever": { en: "forever", es: "para siempre" },

  // Affiliate
  "affiliate.earnTitle": { en: "Earn 50% Commission", es: "Gana 50% de Comision" },
  "affiliate.shareEarn": { en: "Share & Earn Money", es: "Comparte y Gana Dinero" },
  "affiliate.oneClick": {
    en: "One click. No signup. No email. Get your link and earn 50% of every sale.",
    es: "Un clic. Sin registro. Sin email. Obtene tu enlace y gana 50% de cada venta."
  },
  "affiliate.get10free": { en: "Get $10 FREE in your account instantly", es: "Obtene $10 GRATIS en tu cuenta al instante" },
  "affiliate.getLink": { en: "Get My Affiliate Link + $10 Free", es: "Obtener Mi Enlace + $10 Gratis" },
  "affiliate.bonusWaiting": { en: "$10 bonus waiting", es: "Bono de $10 esperando" },
  "affiliate.claimIn": { en: "Claim in", es: "Reclama en" },
  "affiliate.noSignup": { en: "No signup needed", es: "Sin registro" },

  // Common
  "common.learnMore": { en: "Learn More", es: "Saber Mas" },
  "common.getStarted": { en: "Get Started", es: "Comenzar" },
  "common.bestSeller": { en: "Best Seller", es: "Mas Vendido" },
  "common.popular": { en: "Popular", es: "Popular" },
  "common.new": { en: "New", es: "Nuevo" },
  "common.each": { en: "each", es: "cada uno" },

  // Footer
  "footer.shop": { en: "Shop", es: "Tienda" },
  "footer.allProducts": { en: "All Products", es: "Todos los Productos" },
  "footer.templatePacks": { en: "Template Packs", es: "Paquetes" },
  "footer.partyKits": { en: "Party Kits", es: "Kits de Fiesta" },
  "footer.classroomBundles": { en: "Classroom Bundles", es: "Paquetes Escolares" },
  "footer.paperSupplies": { en: "Paper & Supplies", es: "Papel y Materiales" },
  "footer.company": { en: "Company", es: "Empresa" },
  "footer.about": { en: "About", es: "Nosotros" },
  "footer.aiGenerator": { en: "AI Generator", es: "Generador IA" },
  "footer.blog": { en: "Blog", es: "Blog" },
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.changelog": { en: "Changelog", es: "Cambios" },
  "footer.legal": { en: "Legal", es: "Legal" },
  "footer.terms": { en: "Terms of Service", es: "Terminos de Servicio" },
  "footer.privacy": { en: "Privacy Policy", es: "Politica de Privacidad" },
  "footer.tagline": { en: "AI-powered kawaii paper blind boxes for kids, parties, and classrooms.", es: "Cajas sorpresa de papel kawaii con IA para ninos, fiestas y aulas." },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
};

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
});

const LANG_KEY = "blindbox_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null;
    if (saved && (saved === "en" || saved === "es")) {
      setLangState(saved);
    } else {
      // Auto-detect from browser
      const browserLang = navigator.language.slice(0, 2);
      if (browserLang === "es") setLangState("es");
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  const t = (key: string): string => {
    return translations[key]?.[lang] || translations[key]?.en || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

export function LanguageToggle() {
  const { lang, setLang } = useTranslation();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "es" : "en")}
      className="text-xs font-bold px-2.5 py-1.5 rounded-full border border-border hover:bg-muted transition-colors flex items-center gap-1"
      title={lang === "en" ? "Cambiar a Espanol" : "Switch to English"}
    >
      {lang === "en" ? "🇪🇸 ES" : "🇺🇸 EN"}
    </button>
  );
}
